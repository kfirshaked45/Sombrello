export const SideMenuColors = ({ changeBackground }) => {
  const colors = [
    `rgb(0, 121, 191)`,
    `rgb(210, 144, 52)`,
    `rgb(81, 152, 57)`,
    `rgb(176, 70, 50)`,
    `rgb(137, 96, 158)`,
    `rgb(205, 90, 145)`,
    `rgb(75, 191, 107)`,
    `rgb(0, 174, 204)`,
    `rgb(131, 140, 145)`,
    `rgb(0,0,0)`,
  ]

  return (
    <section className="side-menu-colors main-layout">
      <section className="color-list display-grid">
        {colors.map((backgroundColor) => (
          <div
            key={backgroundColor}
            className="display hover"
            style={{ backgroundColor }}
            onClick={() => changeBackground({ backgroundColor, undefined })}
          ></div>
        ))}
      </section>
    </section>
  )
}
