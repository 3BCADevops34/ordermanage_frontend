import React from 'react';
import { createRoot } from 'react-dom/client';
import Sidebar from './components/Sidebar';

test('renders sidebar without crashing', () => {
  const container = document.createElement('div');
  document.body.appendChild(container);

  const root = createRoot(container);
  root.render(<Sidebar activeTab="products" setActiveTab={() => {}} />);
  root.unmount();

  document.body.removeChild(container);
});
