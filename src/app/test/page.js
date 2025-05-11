import React from 'react';
import NavbarWrapper from '@/components/NavBar/wrapper'; // Import your wrapper component
import { fetchHeaderText } from '@/app/actions/fetchHeaderText'; // Import the server action

// This is the main page component in the App Directory
export default async function Page() {
  // Fetch the header text using the server action
  const headerText = await fetchHeaderText(); 

  return (
    <div>
    <NavbarWrapper headerText={headerText} />
        <p>Some Content Here</p>
        <h1>Test</h1>
        <p>Some Content Here</p>
        <h1>Test</h1>
        <p>Some Content Here</p>
        <h1>Test</h1>
        <p>Some Content Here</p>
        <h1>Test</h1>
        <p>Some Content Here</p>
        <h1>Test</h1>
        <p>Some Content Here</p>
        <h1>Test</h1>
        <p>Some Content Here</p>
        <h1>Test</h1>
        <p>Some Content Here</p>
        <h1>Test</h1>
        <p>Some Content Here</p>
        <h1>Test</h1>
        <p>Some Content Here</p>
        <h1>Test</h1>
        <p>Some Content Here</p>
        <h1>Test</h1>
        <p>Some Content Here</p>
        <h1>Test</h1>
        <p>Some Content Here</p>
        <h1>Test</h1>
        <p>Some Content Here</p>
        <h1>Test</h1>
        <p>Some Content Here</p>
        <h1>Test</h1>
        <p>Some Content Here</p>
        <h1>Test</h1>
        <p>Some Content Here</p>
        <h1>Test</h1>
        <p>Some Content Here</p>
        <h1>Test</h1>
        <p>Some Content Here</p>
        <h1>Test</h1>
        <p>Some Content Here</p>
        <h1>Test</h1>
        <p>Some Content Here</p>
        <h1>Test</h1>
    </div>
  );
}
