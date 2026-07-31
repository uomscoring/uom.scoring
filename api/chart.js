import Papa from 'papaparse';

const SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT2ZX1gsf_L1_ioUZLmBVEwCIolt92WicQKJkoM0nn3p7A2GrBfoiQMZVOHvhXJ4ISBkK_pWzmvntyx/pub?output=csv';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'no-store');
  
  try {
    const response = await fetch(SHEET_CSV_URL);
    if (!response.ok) throw new Error('Gagal fetch sheet');
    const csvText = await response.text();
    
    const { data } = Papa.parse(csvText, { header: true, skipEmptyLines: true });

    const result = data.map(row => ({
      artistTitle: row['Artist - Title'] || row['artistTitle'] || '',
      pba: Number(row['PBA']) || 0,
      dnu: Number(row['DNU']) || 0,
      score: Number(row['SCORE']) || 0
    })).filter(item => item.artistTitle);

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Gagal ambil data dari Google Sheet' });
  }
}