import { useSelector } from 'react-redux'

export const SideMenuMainDisplay = ({ onChangeTitle }) => {
  const board = useSelector((state) => state.boardModule.board)

  return (
    <section className="side-menu-main-display">
      <section className="board-menu-content-frame">
        <button onClick={() => onChangeTitle('Change background')}>
          Change background
        </button>
      </section>
    </section>
  )
}
