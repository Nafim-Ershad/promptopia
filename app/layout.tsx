import "@/styles/globals.css";

import NavComponent from "@components/Nav.component";

import Provider from "@components/Provider";

export const metadata = {
  title: "Propmtopia",
  description: "Share & Discover AI Prompts"
}

function RootLayout({children}: any) {
  return (
   <html lang="en">
    <body>
      <Provider>
        <div className="main">
          <div className="gradient"/>
        </div>

        <main className="app">
          <NavComponent/>
          {children}
        </main>
      </Provider>
    </body>
   </html>
  )
}

export default RootLayout;