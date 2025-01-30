import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Button, Divider, Grid, Paper, Typography } from '@mui/material';
import TableComponent from './components/TableComponent';
import SplineChart from './components/ChartComponent';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './store';
import { fetchJsonData } from './features/dataSlice';


const App: React.FC = () => {

  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error } = useSelector((state: RootState) => state.data);

  useEffect(() => {
    dispatch(fetchJsonData());
  }, [dispatch]);
  return (
    <div className="App">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <img src={process.env.PUBLIC_URL +'/stackline_logo.svg'} alt="Logo" style={{ height: 40 }} />
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
      <Grid container spacing={3} sx={{ padding: 2 }}>
        <Grid item xs={12} sm={4} md={3} sx={{ display: 'flex', flexDirection: 'column' }}>
          <Paper sx={{ flexGrow: 1, padding: 2, backgroundColor: 'transparent' }}>
          <Box sx={{ textAlign: 'center' }}>
              <img src="https://4.imimg.com/data4/TF/WW/MY-31354002/nutribullet-600-watt-high-speed-blender-500x500.jpg" alt="Shark Ninja" style={{ width: '50%', height: 'auto', borderRadius: 8 }} />
            </Box>

            <Box sx={{ marginTop: 2 }}>
              <Typography variant="h6">Shark Ninja</Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Magic Bullet NutriBullet 12-Peice
              </Typography>
              <Typography variant='body2' sx={{ color: 'text.secondary' }}>
                High-Speed Blender/Mixer System
              </Typography>
            </Box>

            <Divider sx={{ marginY: 2 }} />

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>

              <Button variant="outlined" color="primary" sx={{ flexShrink: 0 }}>
                Pantry
              </Button>

              <Button variant="outlined" color="primary" sx={{ flexShrink: 0 }}>
                Obsolete
              </Button>

              <Button variant="outlined" color="primary" sx={{ flexShrink: 0 }}>
                Blender
              </Button>

              <Button variant="outlined" color="primary" sx={{ flexShrink: 0 }}>
                Lightning Deal
              </Button>
            </Box>
            <Divider sx={{ marginY: 2 }} />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={8} md={9} sx={{ display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ flex: 1, marginBottom: 2 }}>
            <Paper sx={{ height: '100%', padding: 2 }}>
              <Box sx={{ height: 'auto', backgroundColor: '#f0f0f0' }}>
                {data && <SplineChart data={data[0].sales}/>}
              </Box>
            </Paper>
          </Box>
          <Box sx={{ flex: 1 }}>
            <Paper sx={{ height: '100%', padding: 2 }}>
              <Box sx={{ height: 'auto', backgroundColor: '#f9f9f9' }}>
                {data && <TableComponent data={data}/>}
              </Box>
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
