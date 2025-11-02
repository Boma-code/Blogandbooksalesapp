import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "npm:@supabase/supabase-js@2.47.10";
import * as kv from "./kv_store.tsx";

const app = new Hono();

// Create Supabase client with service role key
const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
);

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-69b1337c/health", (c) => {
  return c.json({ status: "ok" });
});

// Initialize storage buckets
async function initializeStorage() {
  const buckets = [
    'make-69b1337c-essays',
    'make-69b1337c-thumbnails',
    'make-69b1337c-ebooks'
  ];

  for (const bucketName of buckets) {
    const { data: bucketList } = await supabase.storage.listBuckets();
    const bucketExists = bucketList?.some(bucket => bucket.name === bucketName);
    
    if (!bucketExists) {
      await supabase.storage.createBucket(bucketName, { public: false });
      console.log(`Created bucket: ${bucketName}`);
    }
  }
}

// Initialize on startup
initializeStorage().catch(console.error);

// Auth endpoints
app.post("/make-server-69b1337c/auth/signup", async (c) => {
  try {
    const { email, password, name } = await c.req.json();

    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name },
      email_confirm: true, // Auto-confirm since no email server configured
    });

    if (error) {
      console.log(`Signup error: ${error.message}`);
      return c.json({ error: error.message }, 400);
    }

    return c.json({ user: data.user });
  } catch (error) {
    console.log(`Signup exception: ${error}`);
    return c.json({ error: 'Internal server error during signup' }, 500);
  }
});

app.post("/make-server-69b1337c/auth/login", async (c) => {
  try {
    const { email, password } = await c.req.json();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.log(`Login error: ${error.message}`);
      return c.json({ error: error.message }, 401);
    }

    return c.json({ 
      session: data.session,
      user: data.user 
    });
  } catch (error) {
    console.log(`Login exception: ${error}`);
    return c.json({ error: 'Internal server error during login' }, 500);
  }
});

// Essay endpoints
app.get("/make-server-69b1337c/essays", async (c) => {
  try {
    const published = c.req.query('published');
    
    const essays = await kv.getByPrefix('essay:');
    let essayList = essays.map(item => item.value);

    if (published === 'true') {
      essayList = essayList.filter((essay: any) => essay.published);
    }

    return c.json({ essays: essayList });
  } catch (error) {
    console.log(`Error fetching essays: ${error}`);
    return c.json({ error: 'Failed to fetch essays' }, 500);
  }
});

app.get("/make-server-69b1337c/essays/:id", async (c) => {
  try {
    const id = c.req.param('id');
    const essay = await kv.get(`essay:${id}`);

    if (!essay) {
      return c.json({ error: 'Essay not found' }, 404);
    }

    // Increment view count
    const updatedEssay = { ...essay, views: (essay.views || 0) + 1 };
    await kv.set(`essay:${id}`, updatedEssay);

    return c.json({ essay: updatedEssay });
  } catch (error) {
    console.log(`Error fetching essay: ${error}`);
    return c.json({ error: 'Failed to fetch essay' }, 500);
  }
});

app.post("/make-server-69b1337c/essays", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);

    if (!user || error) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const essay = await c.req.json();
    const id = essay.id || Date.now().toString();
    const now = new Date().toISOString();

    const newEssay = {
      ...essay,
      id,
      created_at: essay.created_at || now,
      updated_at: now,
    };

    await kv.set(`essay:${id}`, newEssay);
    return c.json({ essay: newEssay });
  } catch (error) {
    console.log(`Error creating essay: ${error}`);
    return c.json({ error: 'Failed to create essay' }, 500);
  }
});

app.put("/make-server-69b1337c/essays/:id", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);

    if (!user || error) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const id = c.req.param('id');
    const updates = await c.req.json();
    const existing = await kv.get(`essay:${id}`);

    if (!existing) {
      return c.json({ error: 'Essay not found' }, 404);
    }

    const updatedEssay = {
      ...existing,
      ...updates,
      id,
      updated_at: new Date().toISOString(),
    };

    await kv.set(`essay:${id}`, updatedEssay);
    return c.json({ essay: updatedEssay });
  } catch (error) {
    console.log(`Error updating essay: ${error}`);
    return c.json({ error: 'Failed to update essay' }, 500);
  }
});

app.delete("/make-server-69b1337c/essays/:id", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);

    if (!user || error) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const id = c.req.param('id');
    await kv.del(`essay:${id}`);
    return c.json({ success: true });
  } catch (error) {
    console.log(`Error deleting essay: ${error}`);
    return c.json({ error: 'Failed to delete essay' }, 500);
  }
});

// File upload endpoint
app.post("/make-server-69b1337c/upload", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);

    if (!user || error) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const formData = await c.req.formData();
    const file = formData.get('file') as File;
    const type = formData.get('type') as string; // 'thumbnail', 'essay', 'ebook'

    if (!file) {
      return c.json({ error: 'No file provided' }, 400);
    }

    const bucketName = type === 'thumbnail' 
      ? 'make-69b1337c-thumbnails'
      : type === 'ebook'
      ? 'make-69b1337c-ebooks'
      : 'make-69b1337c-essays';

    const fileName = `${Date.now()}-${file.name}`;
    const fileBuffer = await file.arrayBuffer();

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from(bucketName)
      .upload(fileName, fileBuffer, {
        contentType: file.type,
      });

    if (uploadError) {
      console.log(`Upload error: ${uploadError.message}`);
      return c.json({ error: uploadError.message }, 400);
    }

    // Generate signed URL
    const { data: signedUrlData } = await supabase.storage
      .from(bucketName)
      .createSignedUrl(fileName, 60 * 60 * 24 * 365); // 1 year

    return c.json({ 
      url: signedUrlData?.signedUrl,
      path: uploadData.path 
    });
  } catch (error) {
    console.log(`Upload exception: ${error}`);
    return c.json({ error: 'Failed to upload file' }, 500);
  }
});

// Newsletter subscription endpoint
app.post("/make-server-69b1337c/newsletter/subscribe", async (c) => {
  try {
    const { email } = await c.req.json();

    if (!email) {
      return c.json({ error: 'Email is required' }, 400);
    }

    const subscriber = {
      email,
      subscribed_at: new Date().toISOString(),
    };

    await kv.set(`newsletter:${email}`, subscriber);
    return c.json({ success: true });
  } catch (error) {
    console.log(`Newsletter subscription error: ${error}`);
    return c.json({ error: 'Failed to subscribe' }, 500);
  }
});

// Contact form endpoint
app.post("/make-server-69b1337c/contact", async (c) => {
  try {
    const { name, email, subject, message } = await c.req.json();

    if (!name || !email || !subject || !message) {
      return c.json({ error: 'All fields are required' }, 400);
    }

    const contactMessage = {
      name,
      email,
      subject,
      message,
      created_at: new Date().toISOString(),
    };

    const messageId = Date.now().toString();
    await kv.set(`contact:${messageId}`, contactMessage);
    
    return c.json({ success: true });
  } catch (error) {
    console.log(`Contact form error: ${error}`);
    return c.json({ error: 'Failed to send message' }, 500);
  }
});

// Get ebook download URL
app.get("/make-server-69b1337c/ebook/download", async (c) => {
  try {
    const { data: files } = await supabase.storage
      .from('make-69b1337c-ebooks')
      .list();

    if (!files || files.length === 0) {
      return c.json({ error: 'Ebook not found' }, 404);
    }

    // Get the first ebook file
    const ebookFile = files[0];

    const { data: signedUrlData } = await supabase.storage
      .from('make-69b1337c-ebooks')
      .createSignedUrl(ebookFile.name, 60 * 60); // 1 hour

    return c.json({ url: signedUrlData?.signedUrl });
  } catch (error) {
    console.log(`Ebook download error: ${error}`);
    return c.json({ error: 'Failed to get download URL' }, 500);
  }
});

Deno.serve(app.fetch);
