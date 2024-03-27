import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import fetchMock from 'jest-fetch-mock';
import Page from '../app/page';

describe('App component', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  // it('renders without crashing', () => {
  //   render(<Page />);
  // });

  it('fetches data and displays it', async () => {
    const testData = [
      { id: 1, title: 'Test Title 1', body: 'Test Body 1' },
      { id: 2, title: 'Test Title 2', body: 'Test Body 2' }
    ];

    fetchMock.mockResponseOnce(JSON.stringify(testData));

    const { getByText } = render(<Page />);

    fireEvent.click(getByText('Fetch Data'));

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/posts');
      expect(getByText('Test Title 1')).toBeInTheDocument();
      expect(getByText('Test Title 2')).toBeInTheDocument();
    });
  });

  it('displays loading spinner while fetching data', async () => {
    const testData = [
      { id: 1, title: 'Test Title 1', body: 'Test Body 1' },
      { id: 2, title: 'Test Title 2', body: 'Test Body 2' }
    ];

    fetchMock.mockResponseOnce(JSON.stringify(testData));

    const { getByText, getByTestId } = render(<Page />);

    fireEvent.click(getByText('Fetch Data'));

    expect(getByTestId('loading-spinner')).toBeInTheDocument();

    await waitFor(() => {
      expect(getByTestId('loading-spinner')).not.toBeInTheDocument();
    });
  });

  it('handles fetch error', async () => {
    fetchMock.mockRejectOnce(new Error('Failed to fetch'));

    const { getByText } = render(<Page />);

    fireEvent.click(getByText('Fetch Data'));

    await waitFor(() => {
      expect(getByText('Failed to fetch')).toBeInTheDocument();
    });
  });
});
