
import Annoucements from '../components/Annoucements'
import Addproperty from '../components/Addproperty'
import Rentpayment from '../components/Rentpayment'
import Tenants from '../components/Tenants'
export default function SectionPage({params}){
    const {section} = params;
    const renderContent=()=>{
        switch(section){
            case 'Annoucements':
                return <Annoucements/>
            case 'Addproperty':
                return <Addproperty/>
            case 'Rentpayment':
                return <Rentpayment/>
            case 'Tenants':
                return <Tenants/>
            default:
                return<p>Welcome to Admin dashboard</p>
        }
    };
    return(
        <div >
            <div >
                {renderContent()}
            </div>
        </div>
    )
}