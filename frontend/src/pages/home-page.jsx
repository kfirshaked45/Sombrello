import { Link } from 'react-router-dom'

export function HomePage() {
  return (
    <section className="home-page">
      <div className="main">
        <div className="main-content">
          <h1>Welcome to Sombrello</h1>
          <p>
            Forge powerful collaborations, expertly steer projects, and ascend
            to unparalleled levels of productivity. Whether orchestrating
            triumphs in corporate skyscrapers or orchestrating breakthroughs
            from the comfort of your home office, Sombrello empowers your team
            to conquer every challenge with unrivaled efficiency and unwavering
            determination.
          </p>
          <div className="link-container">
            <Link to={'/workspace'}>Start demo</Link>
          </div>
        </div>
      </div>
    </section>
  )
}
