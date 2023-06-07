import { useEffect, useState } from 'react'
import { unsplashService } from '../../../services/unsplash.service'
import { Loader } from '../../general/loader'
import { AiOutlineSearch } from 'react-icons/ai'

export const SideMenuPhotos = ({ changeBackground }) => {
  const [photos, setPhotos] = useState(null)
  const [search, setSearch] = useState('')

  const getPhotos = async () => {
    const photos = await unsplashService.getPhotos(search)
    setPhotos(photos)
  }

  useEffect(() => {
    getPhotos().catch(console.log('Cant get photos'))
  }, [])

  const onSearchPhotos = (ev) => {
    ev.preventDefault()
    if (!search) return
    setPhotos(null)
    getPhotos(search)
  }

  const handleChange = ({ target }) => {
    setSearch(target.value)
  }

  return (
    <section className="side-menu-photos main-layout">
      <form onSubmit={onSearchPhotos}>
        <div className="input-holder">
          <input
            placeholder="Photos"
            type="text"
            className="input"
            value={search}
            onChange={handleChange}
          />
          <AiOutlineSearch className="icon" />
        </div>
      </form>
      {photos ? (
        <section className="photo-list display-grid">
          {photos.map((photo) => (
            <div
              key={photo.background}
              className="display hover-darker"
              style={{
                background: `url('${photo.thumbnail}') center center / cover`,
              }}
              onClick={() => changeBackground(photo)}
            ></div>
          ))}
        </section>
      ) : (
        <Loader />
      )}
    </section>
  )
}
