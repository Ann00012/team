import { User } from "@/services/types";
import css from './UserCard.module.css'
interface UserCardProps { 
    users:User[]
}
export default function UserCard({ users }:UserCardProps) { 
    return (
<> <ul className={css.userList}>
        {
            users?.map(x=> { 
                return (
                        <li className={css.userCard} key={ x.id}>
                        <img src="globe.svg" alt={ x.name} className={css.avatar} />
                        <div className={ css.info}>
                            <h3>{ x.name}</h3>
                            <p>{ x.username}</p>
                            <span>{ x.email}</span>
                </div>
            </li>
        
            )
        })}
                        </ul>
       </>
)

}