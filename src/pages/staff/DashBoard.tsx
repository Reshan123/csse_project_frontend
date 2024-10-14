import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Article from '@mui/icons-material/Article'
import Description from '@mui/icons-material/Description'
import { AppProvider } from '@toolpad/core/AppProvider';
import AddIcon from '@mui/icons-material/Add'
import AppoinmentsIcon from '@mui/icons-material/Event'
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import type { Router, Navigation } from '@toolpad/core';
import MedicalRecordForm from './AddMedicalRecord';
import logo from "../../assets/react.svg"
import SearchRecord from './SearchRecord';


const NAVIGATION: Navigation = [
  {
    kind: 'header',
    title: 'Main items',
  },
  {
    segment: 'dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Patient Details',
  },
  {
    segment: 'records',
    title: 'Records',
    icon: <Article />,
    children: [
        {
            segment: 'addRecord',
            title: 'Add Record',
            icon: <AddIcon />,  
          },
      {
        segment: 'search',
        title: 'View Record',
        icon: <Description/>,
      },
    ],
  },
  {
    segment: 'appoinments',
    title: 'Appoinments',
    icon: <AppoinmentsIcon />,
  },
];

const demoTheme = createTheme({
  palette: {
    mode: 'light', 
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#f50057', 
    },
    background: {
      default: '#f0f2f5', 
      paper: '#ffffff', 
    },
    text: {
      primary: '#000000', 
      secondary: '#555555', 
    },
  },
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});


function DemoPageContent({ pathname }: { pathname: string }) {
  return (
    <Box
      sx={{
        py: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center', // Center vertically
        height: '100vh', // Full height of the viewport
        textAlign: 'center',
      }}
    >
      {pathname === '/records/addRecord' ? (
        <MedicalRecordForm /> 
      ) : pathname === '/records/search' ? 
        <SearchRecord /> : (
        <Typography>Dashboard content for {pathname}</Typography>
      )}
    </Box>
  );
}

  



export default function Dashboard() {
 

  const [pathname, setPathname] = React.useState('/dashboard');

  const router = React.useMemo<Router>(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => {
        setPathname(String(path)); 
      },
    };
  }, [pathname]);

  

  return (
    // preview-start
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      branding={{
        logo: <img src={logo} alt="MUI logo" />,
        title: 'Med-Care',
      }}
    >
      <DashboardLayout>
        <DemoPageContent pathname={pathname} />
      </DashboardLayout>
    </AppProvider>
  );
}
