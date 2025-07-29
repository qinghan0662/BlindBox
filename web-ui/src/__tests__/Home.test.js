import { render, screen } from '@testing-library/react';
import Home from '../pages/Home';

test('renders main navigation', () => {
  render(<Home />);
  expect(screen.getByText(/盲盒抽盒机/)).toBeInTheDocument();
  expect(screen.getByText(/注册/)).toBeInTheDocument();
  expect(screen.getByText(/登录/)).toBeInTheDocument();
});
