import Papa from 'papaparse';

const SHEET_CSV_URL = 'import Papa from 'papaparse';

const SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT2ZX1gsf_L1_ioUZLmBVEwCIolt92WicQKJkoM0nn3p7A2GrBfoiQMZVOHvhXJ4ISBkK_pWzmvntyx/pub?gid=1352500872&single=true&output=csv';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'no-store');

  try {
    const response = await fetch(SHEET_CSV_URL);
    if (!response.ok) throw new Error('Gagal fetch sheet');
    const csvText = await response.text();

    const { data } = Papa.parse(csvText, { header: true, skipEmptyLines: true });

    const result = data.map(row => {
      // Biar ga peduli spasi/kapital
      const get = (keys) => {
        for(let k of keys) if(row[k]!== undefined) return row[k];
        return '';
      }
      return {
        artistTitle: get(['Artist - Title', 'Artist-Title', 'artistTitle']),
        pba: Number(get(['PBA', 'pba'])) || 0,
        dnu: Number(get(['DNU', 'dnu'])) || 0,
        score: Number(get(['SCORE', 'score'])) || 0
      }
    }).filter(item => item.artistTitle);

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Gagal ambil data dari Google Sheet' });
  }
}';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'no-store');

  try {
    const response = await fetch(SHEET_CSV_URL);
    if (!response.ok) throw new Error('Gagal fetch sheet');
    const csvText = await response.text();

    const { data } = Papa.parse(csvText, { header: true, skipEmptyLines: true });

    const result = data.map(row => {
      // Biar ga peduli spasi/kapital
      const get = (keys) => {
        for(let k of keys) if(row[k]!== undefined) return row[k];
        return '';
      }
      return {
        artistTitle: get(['Artist - Title', 'Artist-Title', 'artistTitle']),
        pba: Number(get(['PBA', 'pba'])) || 0,
        dnu: Number(get(['DNU', 'dnu'])) || 0,
        score: Number(get(['SCORE', 'score'])) || 0
      }
    }).filter(item => item.artistTitle);

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Gagal ambil data dari Google Sheet' });
  }
}