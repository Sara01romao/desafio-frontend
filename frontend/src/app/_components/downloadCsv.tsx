'use client';
import { useRef } from 'react';
import { getAllWallet } from '../api/wallets/routes';
import { walletTypes } from '../page';

export default function ExportButton() {
  const linkRef = useRef<HTMLAnchorElement>(null);

  async function downloadCSV(data: walletTypes[]) {
    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(item => 
      Object.values(item)
        .map(value => `"${String(value).replace(/"/g, '""')}"`)
        .join(',')
    );
    const csv = [headers, ...rows].join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    if (linkRef.current) {
      linkRef.current.href = url;
      linkRef.current.download = 'carteiras-btc.csv';
      linkRef.current.click();

      setTimeout(() => URL.revokeObjectURL(url), 100);
    }
  }

  async function handleDownload() {
    const data = await getAllWallet();
    if (data.length > 0) {
      downloadCSV(data);
    }
  }

  return (
    <>
      <a ref={linkRef} style={{ display: 'none' }} />
      <button
        onClick={handleDownload}
        className="flex mr-0 ml-auto items-center justify-center lg:justify-start gap-2 border-2 border-solid border-[#007BFF] px-4 py-2 font-w text-[#007BFF] rounded-sm font-medium cursor-pointer hover:text-[#0C9BF2] hover:border-[#0C9BF2]"
      >
        Exportar CSV
      </button>
    </>
  );
}