import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ApplePerkInfoModal from './ApplePerkInfoModal';
import { isIpad } from '../../../services/dom.service';

// Mock the isIpad function
jest.mock('../../../services/dom.service', () => ({
  isIpad: jest.fn(),
}));

describe('ApplePerkInfoModal', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the modal when isOpen is true', () => {
    isIpad.mockReturnValue(false);

    render(<ApplePerkInfoModal isOpen={true} onClose={mockOnClose} />);

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Important information')).toBeInTheDocument();
    expect(screen.getByText(/you must have an iPhone with iOS 14 or later/i)).toBeInTheDocument();
  });

  test('does not render the modal when isOpen is false', () => {
    render(<ApplePerkInfoModal isOpen={false} onClose={mockOnClose} />);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  test('displays the correct title and body text', () => {
    isIpad.mockReturnValue(false);

    render(<ApplePerkInfoModal isOpen={true} onClose={mockOnClose} />);

    expect(screen.getByText('Important information')).toBeInTheDocument();
    expect(screen.getByText(/you must have an iPhone with iOS 14 or later/i)).toBeInTheDocument();
  });

  test('calls the onClose prop when the Got it button is clicked', () => {
    isIpad.mockReturnValue(false);

    render(<ApplePerkInfoModal isOpen={true} onClose={mockOnClose} />);

    fireEvent.click(screen.getByTestId('CancelButton'));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test('renders in full screen mode when isIpad returns true', () => {
    isIpad.mockReturnValue(true);

    render(<ApplePerkInfoModal isOpen={true} onClose={mockOnClose} />);

    // Assuming fullScreenDialog adds some class or attribute, you can check for that
    expect(screen.getByRole('dialog')).toHaveAttribute('fullscreen', 'true');
  });
});

