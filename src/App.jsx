import {  Outlet } from 'react-router-dom';

export default function App() {
  return (
    <div className='h-screen min-w-screen'>
      <Outlet/>
    </div>
  );
}