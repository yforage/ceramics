import React from 'react';
import './src/styles/global.css';
import { GatsbyBrowser } from 'gatsby';
import Layout from './src/components/layout/Layout';
import QueriedElement from './src/context/QueryContext';
import SessionContextElement from './src/context/SessionContext';

export const wrapPageElement: GatsbyBrowser['wrapPageElement'] = ({ element, props }) => <Layout {...props}>{element}</Layout>

export const wrapRootElement: GatsbyBrowser['wrapRootElement'] = ({ element }) => (
  <QueriedElement>
    <SessionContextElement element={element} />
  </QueriedElement>
)