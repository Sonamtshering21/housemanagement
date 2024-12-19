'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from '../components/styles.module.css'
const Sidebar = () =>{
    const pathname=usePathname();
    return(
        <div className={styles.sidebar}>
            <ul>
                <li>
                    <Link href='/dashboard/Annoucements' className={pathname=='/dashboard/Annoucements' ? '': ''}>
                    <div>Annoucements</div>
                    </Link>
                </li>
                <li>
                    <Link href='/dashboard/Tenants' className={pathname=='/dashboard/Tenants' ? '': ''}>
                    <div>Rooms & Tenants Detail</div>
                    </Link>
                </li>
                <li>
                    <Link href='/dashboard/Rentpayment' className={pathname=='/dashboard/Rentpayment' ? '': ''}>
                    <div>Rent Payment</div>
                    </Link>
                </li>
            
                <li>
                    <Link href='/dashboard/Addproperty' className={pathname=='/dashboard/Addproperty' ? '': ''}>
                    <div>Add Property</div>
                    </Link>
                </li>
                <li>
                    <Link href='/dashboard/Annoucements' className={pathname=='/dashboard/Annoucements' ? '': ''}>
                    <div>Tenants feedback</div>
                    </Link>
                </li>
                <li>
                    <Link href='/dashboard/Annoucements' className={pathname=='/dashboard/Annoucements' ? '': ''}>
                    <div>House details</div>
                    </Link>
                </li>
                <li>
                    <Link href='/dashboard/Annoucements' className={pathname=='/dashboard/Annoucements' ? '': ''}>
                    <div>Booking and payment</div>
                    </Link>
                </li>
                
               
                <li>
                    <Link href='/dashboard/Annoucements' className={pathname=='/dashboard/Annoucements' ? '': ''}>
                    <div>Hotels details</div>
                    </Link>
                </li>
                <li>
                    <Link href='/dashboard/Annoucements' className={pathname=='/dashboard/Annoucements' ? '': ''}>
                    <div>Homestays</div>
                    </Link>
                </li>
            </ul>
        </div>
    )
}
export default Sidebar;