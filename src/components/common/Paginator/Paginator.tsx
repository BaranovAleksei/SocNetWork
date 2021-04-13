import React from "react"
import s from './Paginator.module.sass'

type PaginatorType = {
  currentPage: number
  onPageChanged: (p: number) => void
  pageSize: number
  totalUserCount: number
}

export const Paginator:React.FC<PaginatorType> = (props) => {

    let pagesCount = Math.ceil(props.totalUserCount / props.pageSize)
    let pages = []
    for (let i = 1; i<=pagesCount; i++ ){
      pages.push(i)
    }

    return <div className={s.pagination}>
        { pages.map( p => {
          return <span className = { props.currentPage === p ? s.activePage : ''}
          onClick={ () => { props.onPageChanged(p) }}>{p}</span>
        })}
      </div>

}