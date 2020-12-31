const sizes = {
  up() {
  },
  down(size) {
    const breakPoints = {
      xs: '575.98px',
      sm: '767.98px',
      md: '991.98px',
      lg: '1199.98px',
      xl: '1599.98px'
    };
    return `@media (max-width: ${breakPoints[size]})`;
  }
};

export default sizes;