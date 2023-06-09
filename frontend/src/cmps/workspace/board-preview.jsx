import { Link } from 'react-router-dom'
import { AiOutlineStar, AiFillStar } from 'react-icons/ai'
import 'animate.css'

export const BoardPreview = ({ board, onToggleStarred }) => {
  const getBoardStyle = () => {
    if (!board || !board.style) return {}
    if (board.style.background)
      return {
        background: `url('${board.style.thumbnail}') center center / cover`,
      }
    else if (board.style.backgroundColor)
      return { backgroundColor: `${board.style.backgroundColor}` }
    return { backgroundColor: `#5ba4cf` }
  }

  const boardStyle = getBoardStyle()
  return (
    <div>
      <Link key={board._id} to={`/board/${board._id}`}>
        <section
          className={`board-preview ${
            board.title.length > 20 ? 'long-title' : ''
          }`}
          style={boardStyle}
        >
          <span className="board-hover">
            <div className="board-preview-details">
              <h3>{board.title}</h3>
              <div
                className={`board-star ${
                  board.isStarred ? 'starred' : ''
                } animate__animated animate__fadeInRight `}
              >
                {board.isStarred ? (
                  <AiFillStar
                    onClick={(ev) => onToggleStarred(ev, board._id)}
                  />
                ) : (
                  <AiOutlineStar
                    onClick={(ev) => onToggleStarred(ev, board._id)}
                  />
                )}
              </div>
            </div>
          </span>
        </section>
      </Link>
    </div>
  )
}
