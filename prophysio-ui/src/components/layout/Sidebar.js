import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import PaymentIcon from '@mui/icons-material/Payment';
import RequestPageIcon from '@mui/icons-material/RequestPage';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SettingsIcon from '@mui/icons-material/Settings';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';

const pages = [
    {
        text: 'Dashboard',
        icon: <DashboardIcon />,
        href: '/home'
    },
    {
        text: 'Patients',
        icon: <PeopleIcon />,
        href: '/home/patients'
    },
    {
        text: 'Guarantors',
        icon: <AccountBalanceIcon />,
        href: '/home/guarantors'
    },
    {
        text: 'Appointments',
        icon: <EventAvailableIcon />,
        href: '/home/appointments'
    },
    {
        text: 'Billing',
        icon: <PaymentIcon />,
        href: '/home/billing'
    },
    {
        text: 'Invoices',
        icon: <RequestPageIcon />,
        href: '/home/invoices'
    },
    {
        text: 'Statement of Accts',
        icon: <ShoppingCartIcon />,
        href: '/home/statement'
    }
];
const additionalPages = [
    {
        text: 'Settings',
        icon: <SettingsIcon />,
        href: '/home/settings'
    },
    {
        text: 'Users',
        icon: <SupervisedUserCircleIcon />,
        href: '/home/users'
    }
];

const Sidebar = () => {
    return (
        <div>
            <Toolbar />
            <Divider />
            <List>
                {pages.map(({ text, icon, href }) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton href={href}>
                            <ListItemIcon>
                                {icon}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {additionalPages.map(({ text, icon, href }) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton href={href}>
                            <ListItemIcon>
                                {icon}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </div>
    );
}

export default Sidebar;