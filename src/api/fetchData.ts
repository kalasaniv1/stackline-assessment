const fetchData = async () => {
    const response = await fetch('/stackline_frontend_assessment_data_2021.json'); // Assuming your file is data.json in public folder
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    return response.json();
  };
  
  export default fetchData;
  