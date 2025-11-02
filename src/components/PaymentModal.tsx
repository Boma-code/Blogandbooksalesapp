import { useState } from 'react';
import { Copy, CheckCircle, Wallet } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Button } from './ui/button';
import { toast } from 'sonner@2.0.3';

type PaymentModalProps = {
  open: boolean;
  onClose: () => void;
  onPaymentConfirmed: () => void;
};

export function PaymentModal({ open, onClose, onPaymentConfirmed }: PaymentModalProps) {
  const [copied, setCopied] = useState(false);
  const [confirming, setConfirming] = useState(false);
  
  const walletAddress = 'TSBGJuVMXhC2TPGse3g2ZW767zBMNDLzib';
  const amount = '30 USDT';

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    toast.success('Wallet address copied to clipboard!');
    setTimeout(() => setCopied(false), 3000);
  };

  const handleConfirmPayment = async () => {
    setConfirming(true);
    
    // Simulate payment verification delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast.success('Payment confirmed! You can now download your eBook.');
    onPaymentConfirmed();
    setConfirming(false);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Wallet className="w-6 h-6 text-yellow-500" />
            Complete Your Purchase
          </DialogTitle>
          <DialogDescription>
            Send exactly {amount} (TRC20) to the wallet address below
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Amount */}
          <div className="bg-yellow-50 border-2 border-yellow-500 rounded-lg p-4 text-center">
            <p className="text-sm text-gray-600 mb-1">Amount to Send</p>
            <p className="text-3xl text-black">{amount}</p>
            <p className="text-sm text-gray-600 mt-1">USDT (TRC20)</p>
          </div>

          {/* Wallet Address */}
          <div>
            <label className="block text-sm mb-2 text-gray-700">
              Wallet Address (TRC20)
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={walletAddress}
                readOnly
                className="flex-1 px-3 py-2 border-2 border-gray-300 rounded-lg bg-gray-50 text-sm font-mono"
              />
              <Button
                onClick={handleCopyAddress}
                variant="outline"
                className="border-yellow-500 text-yellow-700 hover:bg-yellow-500 hover:text-black"
              >
                {copied ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="text-sm mb-2 text-blue-900">
              Payment Instructions:
            </h4>
            <ol className="text-sm text-blue-800 space-y-2 list-decimal list-inside">
              <li>Copy the wallet address above</li>
              <li>Open your crypto wallet (TronLink, Trust Wallet, etc.)</li>
              <li>Send exactly {amount} (TRC20) to the address</li>
              <li>Click "I've Paid" below after sending</li>
              <li>Wait for confirmation (usually 1-2 minutes)</li>
            </ol>
          </div>

          {/* Warning */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-sm text-red-800">
              ⚠️ <strong>Important:</strong> Only send USDT on the TRC20 network. 
              Sending other tokens or using wrong networks may result in permanent loss of funds.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1 border-gray-300"
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirmPayment}
              disabled={confirming}
              className="flex-1 bg-yellow-500 text-black hover:bg-yellow-600"
            >
              {confirming ? (
                <>Processing...</>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  I've Paid
                </>
              )}
            </Button>
          </div>

          {/* Support */}
          <p className="text-xs text-center text-gray-500">
            Having issues? Contact support at{' '}
            <a href="mailto:support@colinstandley.com" className="text-yellow-600 hover:underline">
              support@colinstandley.com
            </a>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
