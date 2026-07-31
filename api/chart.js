    export default async function handler(req, res) {
      const SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT2ZX1gsf_L1_ioUZLmBVEwCIolt92WicQKJkoM0nn3p7A2GrBfoiQMZVOHvhXJ4ISBkK_pWzmvntyx/pub?gid=1352500872&single=true&output=csv';
      
      const response = await fetch(SHEET_URL);
      const text = await response.text();
      
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate');
      res.status(200).send(text);
    }
