

export default function Navbar(){
    return  <nav className="nav"> 
    <ul>
            <li ><a href="/registering">تسجيل البقر</a></li>
            <li ><a href="/medicalExaminationRegistration"> تسجيل الفحص الطبي</a></li>
            <li ><a href="/birthRegistration"> تسجيل الولادات </a></li>
            <li ><a href="/totalDailyMilkProduction">تسجيل انتاج الحليب اليومي</a></li>
    </ul>
    <a href="/" className="site-title">مزرعة النجاح</a>
    </nav>
}