const fetchData = async () => {
  const URL = process.env.PUBLIC_URL+ '/stackline_frontend_assessment_data_2021.json'
    const response = await fetch(URL); // Assuming your file is data.json in public folder
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    return response.json();
  };
  
  export default fetchData;
  