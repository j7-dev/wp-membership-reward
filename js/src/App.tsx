/* eslint-disable quote-props */
import '@/assets/scss/index.scss'

import { Refine } from '@refinedev/core'
import { Sider } from '@/components/layout/'
import {
  ErrorComponent,
  notificationProvider,
  ThemedLayoutV2,
} from '@refinedev/antd'
import '@refinedev/antd/dist/reset.css'
import routerBindings, {
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from '@refinedev/react-router-v6'
import { dataProvider } from './rest-data-provider'
import { HashRouter, Outlet, Route, Routes } from 'react-router-dom'
import { apiUrl } from '@/utils'
import { resources } from '@/resources'
import {
  MemberLevelList,
  MemberLevelEdit,
  MemberLevelCreate,
} from '@/pages/MemberLevel/'

function App() {
  return (
    <HashRouter>
      <Refine
        dataProvider={{
          default: dataProvider(`${apiUrl}/wp/v2`),
          'wp-rest': dataProvider(`${apiUrl}/wp/v2`),
          'wc-rest': dataProvider(`${apiUrl}/wp/v2`),
          'wc-store': dataProvider(`${apiUrl}/wp/v2`),
        }}
        notificationProvider={notificationProvider}
        routerProvider={routerBindings}
        resources={resources}
        options={{
          syncWithLocation: false,
          warnWhenUnsavedChanges: true,
          projectId: 'IIIxOo-nIeSnx-oood94',
        }}
      >
        <Routes>
          <Route
            element={
              <ThemedLayoutV2 Sider={Sider}>
                <Outlet />
              </ThemedLayoutV2>
            }
          >
            <Route index element={<MemberLevelList />} />

            <Route path="/member_lv/">
              <Route index element={<MemberLevelList />} />
              <Route path="edit/:id" element={<MemberLevelEdit />} />
              <Route path="create" element={<MemberLevelCreate />} />
            </Route>

            {/* <Route path="/member_lvs/delete/:id" element={<MemberLevelEdit />} /> */}

            <Route path="*" element={<ErrorComponent />} />
          </Route>
        </Routes>
        <UnsavedChangesNotifier />
        <DocumentTitleHandler />
      </Refine>
    </HashRouter>
  )
}

export default App
