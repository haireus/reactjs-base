import React, { createContext, useCallback, useState } from 'react';

export const SideNavContext = createContext({
  collapsed: false,
  toggle: () => {},
});

const _collapsed = localStorage.getItem('_sidenav_collapsed') === 'true';

export const SideNavProvider = ({ children }: any) => {
  const [collapsed, setCollapsed] = useState(_collapsed);
  const toggle = useCallback(() => {
    localStorage.setItem('_sidenav_collapsed', `${!collapsed}`);
    setCollapsed(!collapsed);
  }, [collapsed, setCollapsed]);

  return <SideNavContext.Provider value={{ collapsed, toggle }}>{children}</SideNavContext.Provider>;
};
