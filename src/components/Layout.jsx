import { useTranslation } from 'react-i18next'
import Header from './Header'
import Footer from './Footer'
import styled from 'styled-components'
import { Outlet } from 'react-router-dom';

const Main = styled.main`
  min-height: calc(100vh - 140px);
  display: flex;
  flex-direction: column;
`

function Layout({ children }) {
  const { t } = useTranslation()
  
  return (
    <>
      <Header />
      <Main>
       <Outlet />
      </Main>
      <Footer />
    </>
  )
}

export default Layout