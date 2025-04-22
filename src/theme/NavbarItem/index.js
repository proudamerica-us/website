import React from 'react';
import ComponentTypes from '@theme/NavbarItem/ComponentTypes';
import RealTimeClock from '@site/src/components/RealTimeClock';

function normalizeComponentType(type, props) {
  // Backward compatibility: navbar item with no type set
  // but containing dropdown items should use the type "dropdown"
  if (!type || type === 'default') {
    return 'items' in props ? 'dropdown' : 'default';
  }
  return type;
}

export default function NavbarItem({ type, ...props }) {
  const componentType = normalizeComponentType(type, props);

  // If this is the clock item, render RealTimeClock instead
  if (componentType === 'html' && props.value?.includes('navbar-realtime-clock')) {
    return <RealTimeClock />;
  }

  const NavbarItemComponent = ComponentTypes[componentType];
  if (!NavbarItemComponent) {
    throw new Error(`No NavbarItem component found for type "${type}".`);
  }
  return <NavbarItemComponent {...props} />;
}
