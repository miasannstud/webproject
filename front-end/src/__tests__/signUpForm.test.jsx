/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Signup from '../pages/auth/signUpForm';

describe('Signup Form', () => {
  beforeEach(() => {
    // Reset fetch mock before each test
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('renders all input fields and the signup button', () => {
    render(<Signup />);
    
    expect(screen.getByPlaceholderText('Enter First Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter Last Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter Username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /signup/i })).toBeInTheDocument();
  });

  test('allows user to fill the form and submit successfully', async () => {
    const mockResponse = {
      ok: true,
      json: async () => ({ message: 'Signup successful!' }),
    };
    global.fetch.mockResolvedValueOnce(mockResponse);

    render(<Signup />);
    
    fireEvent.change(screen.getByPlaceholderText('Enter First Name'), { target: { value: 'John' } });
    fireEvent.change(screen.getByPlaceholderText('Enter Last Name'), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByPlaceholderText('Enter Username'), { target: { value: 'johndoe' } });
    fireEvent.change(screen.getByPlaceholderText('Enter Email'), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Enter Password'), { target: { value: 'secret123' } });
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Other' } });

    fireEvent.click(screen.getByRole('button', { name: /signup/i }));

    await waitFor(() => {
      expect(screen.getByText(/Signup successful!/i)).toBeInTheDocument();
    });

    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  test('shows error message on failed signup', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: 'Username already exists' }),
    });

    render(<Signup />);

    fireEvent.change(screen.getByPlaceholderText('Enter First Name'), { target: { value: 'Jane' } });
    fireEvent.change(screen.getByPlaceholderText('Enter Last Name'), { target: { value: 'Smith' } });
    fireEvent.change(screen.getByPlaceholderText('Enter Username'), { target: { value: 'janesmith' } });
    fireEvent.change(screen.getByPlaceholderText('Enter Email'), { target: { value: 'jane@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Enter Password'), { target: { value: 'secret321' } });

    fireEvent.click(screen.getByRole('button', { name: /signup/i }));

    await waitFor(() => {
      expect(screen.getByText(/Username already exists/i)).toBeInTheDocument();
    });
  });
});
