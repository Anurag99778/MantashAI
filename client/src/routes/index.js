
import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import SignIn from '../pages/SignIn';
import Dashboard from '../pages/Dashboard';
import VesselDetails from '../pages/VesselDetails'; // Add this import
import BiofoulingRecord from '../pages/BiofoulingRecord'; // Add this import
import ShipProfile from '../pages/ShipProfile'; // Add this import
import IntegrationStatus from '../pages/IntegrationStatus'; // Add this import
import Settings from '../pages/Settings'; // Add this import
import MainLayout from '../layout/MainLayout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <SignIn />,
      },
      {
        path: 'dashboard/:userId',
        element: <MainLayout><Dashboard /></MainLayout>,
      },
      {
        path: 'vessel-details/:userId', // Add this route
        element: <MainLayout><VesselDetails /></MainLayout>,
      },
      {
        path: 'biofouling-record/:userId', // Add this route
        element: <MainLayout><BiofoulingRecord /></MainLayout>,
      },
      {
        path: 'ship-profile/:userId', // Add this route
        element: <MainLayout><ShipProfile /></MainLayout>,
      },
      {
        path: 'integration-status/:userId', // Add this route
        element: <MainLayout><IntegrationStatus /></MainLayout>,
      },
      {
        path: 'settings/:userId', // Add this route
        element: <MainLayout><Settings /></MainLayout>,
      },
    ],
  },
]);

export default router;
