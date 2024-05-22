import React, { useCallback, useState } from "react"
import { Link } from "gatsby"
import { ELinks } from "../../../constants"
import { ChevronDownIcon } from "@heroicons/react/24/outline"
import { ICategorieApi } from "../../../customTypes/api"

interface ICatalogLinksProps {
  categories?: Pick<ICategorieApi, 'id' | 'name' | 'slug'>[];
}

const CatalogLinks: React.FC<ICatalogLinksProps> = ({ categories }) => {
  const [isOpened, setIsOpened] = useState(false);

  const toggleOpen = useCallback(() => setIsOpened((prev) => !prev), []);
  return (
    <div className={`space-y-4`}>
      <div>
        <Link
          to={ELinks.CATALOG}
        >
          Каталог
        </Link>
        <button onClick={toggleOpen}>
          <ChevronDownIcon className={`w-4 ml-2 ${isOpened ? 'rotate-180' : ''} transition-transform`} />
        </button>
      </div>
      {isOpened && (
        <div className={`flex flex-col text-base space-y-4`}>
          {categories?.map(({ id, name, slug }) => (
            <Link to={`${ELinks.CATALOG}?categorie=${slug}`} key={id}>
              {name}
            </Link>
          ))}
        </div>
      )}
    </div>

  )
}

export default CatalogLinks;