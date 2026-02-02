// ================= LANGUAGE TRANSLATION SYSTEM =================
// translations.js - Add this as a new file or include in common.js

const translations = {
    en: {
        // Navbar
        'nav.home': 'Home',
        'nav.services': 'Services',
        'nav.careers': 'Careers',
        'nav.about': 'About Us',
        'nav.contact': 'Contact us',
        'nav.language': 'English',
        
        // Landing Page
        'hero.title': 'NX<span class="red-dot">▸</span>STEP',
        'hero.description': 'We specialize in Learning Management System (LMS) Administration and Back-office support, built to help Japanese companies manage their e-learning operations smoothly and efficiently. We understand that learning does not stop after implementation — it continues through consistent support, maintenance, and improvement.',
        'hero.cta': 'BOOK A DEMO',
        
        'features.title': 'Our Services',
        'features.desc1': 'Comprehensive LMS administration and operational support built to strengthen your e-learning environment.',
        'features.desc2': 'We support Japanese organizations beyond implementation — providing ongoing maintenance, operational support, and continuous improvement so learning never stops.',
        'features.stat1.label': 'Languages',
        'features.stat2.label': 'Countries',
        'features.cta': 'Explore Services',
        
        'features.card1.title': 'Tech Support',
        'features.card1.category': 'Essential',
        'features.card2.title': 'Multi-Language',
        'features.card2.category': 'Global',
        'features.card3.title': 'Custom Learning',
        'features.card3.category': 'Tailored',
        
        'about.header': 'ABOUT US',
        'about.text1': 'Founded on trust and professionalism, our company is focused on providing reliable solutions while fostering a culture of growth and collaboration. We are dedicated to continuous improvement and long-term success.',
        'about.text2': 'People are at the heart of our success. We are a team driven by shared values, teamwork, and a commitment to excellence. Together, we work to achieve our goals and grow as one organization.',
        'about.cta': 'ABOUT US',
        
        'join.header': 'JOIN OUR TEAM',
        'join.text': 'Be part of a dynamic and growing organization where your skills and ideas make an impact. We offer a supportive work environment, opportunities for growth, and a culture that values excellence and collaboration.',
        'join.cta': 'CAREERS',
        
        // Services Page
        'services.hero.title': 'Discover Your Next Step<br>at NX<span class="red-arrow">►</span>STEP',
        'services.header': 'Services',
        
        'service1.title': 'Custom Learning',
        'service1.description': 'Precision crafted courses tailored to your workflows.',
        'service2.title': 'Cloud Access',
        'service2.description': 'Learn anytime, anywhere, on any device.',
        'service3.title': 'Course Design',
        'service3.description': 'Clean, easy-to-follow learning materials.',
        'service4.title': 'Multi-language Support',
        'service4.description': 'Training in the language your team understands.',
        'service5.title': 'Tech Support',
        'service5.description': 'Reliable technical assistance.',
        'service6.title': 'Data Insight',
        'service6.description': 'Understand how your team learns.',
        'service7.title': 'Training Video Production',
        'service7.description': 'High-quality training videos.',
        'service8.title': 'Scriptwriting & Storyboarding',
        'service8.description': 'Clear, structured training content.',
        'service9.title': 'Data Privacy & Protection',
        'service9.description': 'Secure your training materials.',
        'service10.title': 'Team Collaboration',
        'service10.description': 'Engage learners through collaboration.',
        'service11.title': 'Security & Compliance Implementation',
        'service11.description': 'Enterprise-grade protection.',
        
        'modal.subtitle': 'Comprehensive solution for your organization',
        'modal.learnmore': 'Learn more',
        
        // Careers Page
        'careers.hero.badge': 'Join Our Team',
        'careers.hero.title': 'Shape the Future of Learning',
        'careers.hero.subtitle': 'Discover opportunities to grow your career in e-learning innovation',
        'careers.section.title': 'Open Positions',
        'careers.section.subtitle': 'Explore exciting career opportunities and join a team that\'s transforming education',
        
        'careers.filter.all': 'All Positions',
        'careers.filter.creative': 'Creative',
        'careers.filter.technical': 'Technical',
        'careers.filter.management': 'Management',
        
        'careers.meta.location': 'Cebu City',
        'careers.meta.experience': 'years',
        'careers.responsibilities': 'Responsibilities:',
        'careers.qualifications': 'Qualifications:',
        'careers.apply': 'Apply Now',
        
        'careers.modal.title': 'Application Form',
        'careers.form.name': 'Full Name',
        'careers.form.name.hint': '(Last Name, First Name, MI)',
        'careers.form.email': 'Email Address',
        'careers.form.phone': 'Phone Number',
        'careers.form.address': 'Address',
        'careers.form.resume': 'Resume/CV',
        'careers.form.resume.hint': '(PDF, DOC, or DOCX format)',
        'careers.form.upload': 'Click to upload or drag and drop',
        'careers.form.upload.hint': 'PDF, DOC, DOCX (Max 10MB)',
        'careers.form.cancel': 'Cancel',
        'careers.form.submit': 'Submit Application',
        
        'careers.info.offer': '💼 What We Offer',
        'careers.info.schedule': '🕐 Work Schedule',
        'careers.info.schedule.text': 'Morning Shift | Monday to Friday<br>8:00 AM - 5:00 PM (with flexible hours)',
        'careers.info.location': '📍 Location',
        'careers.info.location.text': 'Cebu Business Park, Cebu City, Philippines<br>Hybrid work setup available',
        'careers.info.questions': '📧 Questions?',
        'careers.info.questions.text': 'Contact our HR team for more information about this position and our application process.',
        
        'careers.success.title': 'Application Submitted!',
        'careers.success.message': 'Thank you for your interest in joining our team. We\'ve received your application and will review it carefully. You\'ll hear from us within 5-7 business days.',
        'careers.success.close': 'Close',
        
        // About Us Page
        'aboutus.hero.title': 'About us',
        'aboutus.hero.desc1': 'NX-STEP is a professional LMS administration and back-office support provider dedicated to helping Japanese businesses manage and optimize their e-learning systems.',
        'aboutus.hero.desc2': 'We started with a simple goal — to make learning management easier, smarter, and more aligned with the way people work in real companies.',
        
        'aboutus.mission.title': 'Mission',
        'aboutus.mission.text1': 'Our mission is to empower Japanese companies by managing their e-learning systems with precision, consistency, and care.',
        'aboutus.mission.text2': 'We believe that when learning is well supported, organizations grow stronger — not only in knowledge but also in culture and efficiency.',
        
        'aboutus.vision.title': 'Vision',
        'aboutus.vision.item1': '<strong>Professionalism:</strong> We uphold high standards in every task.',
        'aboutus.vision.item2': '<strong>Clarity:</strong> We work to make communication is simple, accurate, and culturally appropriate.',
        'aboutus.vision.item3': '<strong>Commitment:</strong> We deliver consistent results and continuous improvement.',
        'aboutus.vision.item4': '<strong>Respect:</strong> We value every client relationship as a partnership built on trust.',
        
        'aboutus.values.title': 'Core Values',
        'aboutus.value1': '<strong>Integrity</strong> — We operate with honesty and transparency.',
        'aboutus.value2': '<strong>Excellence</strong> — We strive for the highest standards in everything we do.',
        'aboutus.value3': '<strong>Collaboration</strong> — We succeed together, as partners and as a team.',
        'aboutus.value4': '<strong>Innovation</strong> — We embrace technology to enhance our clients\' success.',
        
        'aboutus.founders.title': 'FOUNDERS',
        'aboutus.building.title': 'Building',
        'aboutus.building.text': 'Our office is located in this building at Unit C-2, 12th Floor, 2Quad Building, Cardinal Rosales Avenue corner Sumilon Road, Cebu Business Park, Hippodromo, Cebu City, Philippines. This central location allows us to better serve our partners and clients. We welcome you to visit us at our Cebu City office.',
        
        'aboutus.map.title': 'google map',
        'aboutus.map.text': 'Use the interactive Google Map to easily locate our office in Cebu City. The map provides clear directions and nearby landmarks to help guide your visit. For your convenience, you may zoom in or view the larger map for detailed navigation.',
        
        'aboutus.teams.title': 'TEAMS',
        'aboutus.teams.desc1': 'Behind NX-STEP is a group of LMS administrators, support specialists, and bilingual coordinators who share one vision — to make learning operations seamless and effective.',
        'aboutus.teams.desc2': 'Our team understands how Japanese companies value detail, quality, and reliability — and that\'s exactly how we work every day.',
        
        // Contact Page
        'contact.hero.title': 'Get in touch with us',
        'contact.hero.description': 'Contact us were here to help! Whether you have a question about our LMS support services, need technical assistance, or want to request a demo—wed love to hear from you.',
        'contact.header': 'Information Details',
        
        'contact.form.firstname': 'First Name',
        'contact.form.lastname': 'Last Name',
        'contact.form.email': 'Email',
        'contact.form.subject': 'Subject',
        'contact.form.message': 'Message',
        'contact.form.submit': 'Submit',
        
        'contact.info.title': 'For Other Contact',
        'contact.info.text': 'email us at',
        'contact.info.email': 'support@nx-step.org',
        'contact.info.visit': 'or you can visit us in our office,',
        
        'contact.success.title': '✓ Message Sent!',
        'contact.success.message': 'Thank you for contacting us. We\'ve received your message and will get back to you soon.',
        'contact.success.close': 'Close',
        
        // Footer
        'footer.partner': 'Our Partner:',
        'footer.partner.name': 'NX-SYS CORPORATION',
        'footer.location': 'Location:',
        'footer.address': 'UNIT C-2 12TH FLR 2QUAD BLDG CARDINAL ROSALES AVE COR SUMILON RD CEBU BUS. PARK HIPPODROMO, CEBU CITY, PHILIPPINES'
    },
    
    ja: {
        // Navbar
        'nav.home': 'ホーム',
        'nav.services': 'サービス',
        'nav.careers': 'キャリア',
        'nav.about': '会社概要',
        'nav.contact': 'お問い合わせ',
        'nav.language': '日本語',
        
        // Landing Page
        'hero.title': 'NX<span class="red-dot">▸</span>STEP',
        'hero.description': '私たちは、日本企業がeラーニング運用を円滑かつ効率的に管理できるよう支援する、専門的なLMS(学習管理システム)の管理とバックオフィスサポートを専門としています。学習は導入後も終わらず、一貫したサポート、メンテナンス、改善を通じて継続されることを理解しています。',
        'hero.cta': 'デモを予約',
        
        'features.title': '私たちのサービス',
        'features.desc1': 'eラーニング環境を強化するために構築された包括的なLMS管理と運用サポート。',
        'features.desc2': '導入後も日本の組織をサポートし、継続的なメンテナンス、運用サポート、継続的な改善を提供し、学習が止まることはありません。',
        'features.stat1.label': '言語',
        'features.stat2.label': '国',
        'features.cta': 'サービスを見る',
        
        'features.card1.title': 'テクニカルサポート',
        'features.card1.category': '必須',
        'features.card2.title': '多言語対応',
        'features.card2.category': 'グローバル',
        'features.card3.title': 'カスタム学習',
        'features.card3.category': 'カスタマイズ',
        
        'about.header': '会社概要',
        'about.text1': '信頼とプロフェッショナリズムに基づいて設立された当社は、成長と協力の文化を育みながら、信頼できるソリューションを提供することに注力しています。継続的な改善と長期的な成功に専念しています。',
        'about.text2': '人々は私たちの成功の中心です。私たちは、共有された価値観、チームワーク、卓越性へのコミットメントによって動かされるチームです。一緒に目標を達成し、一つの組織として成長します。',
        'about.cta': '会社概要',
        
        'join.header': 'チームに参加',
        'join.text': 'あなたのスキルとアイデアが影響を与える、ダイナミックで成長中の組織の一員になりましょう。サポート的な職場環境、成長の機会、そして卓越性と協力を重視する文化を提供します。',
        'join.cta': 'キャリア',
        
        // Services Page
        'services.hero.title': 'あなたの次のステップを発見<br>NX<span class="red-arrow">►</span>STEPで',
        'services.header': 'サービス',
        
        'service1.title': 'カスタム学習',
        'service1.description': 'ワークフローに合わせて精密に作成されたコース。',
        'service2.title': 'クラウドアクセス',
        'service2.description': 'いつでも、どこでも、どのデバイスでも学習。',
        'service3.title': 'コース設計',
        'service3.description': 'わかりやすく、フォローしやすい学習教材。',
        'service4.title': '多言語サポート',
        'service4.description': 'チームが理解できる言語でのトレーニング。',
        'service5.title': 'テクニカルサポート',
        'service5.description': '信頼できる技術支援。',
        'service6.title': 'データインサイト',
        'service6.description': 'チームの学習方法を理解する。',
        'service7.title': 'トレーニング動画制作',
        'service7.description': '高品質なトレーニング動画。',
        'service8.title': '脚本・絵コンテ作成',
        'service8.description': '明確で構造化されたトレーニングコンテンツ。',
        'service9.title': 'データプライバシー保護',
        'service9.description': 'トレーニング資料を保護。',
        'service10.title': 'チームコラボレーション',
        'service10.description': 'コラボレーションを通じて学習者を参加させる。',
        'service11.title': 'セキュリティとコンプライアンス',
        'service11.description': 'エンタープライズグレードの保護。',
        
        'modal.subtitle': '組織のための包括的なソリューション',
        'modal.learnmore': '詳細を見る',
        
        // Careers Page
        'careers.hero.badge': 'チームに参加',
        'careers.hero.title': '学習の未来を形作る',
        'careers.hero.subtitle': 'eラーニング革新でキャリアを成長させる機会を発見',
        'careers.section.title': '募集中のポジション',
        'careers.section.subtitle': 'エキサイティングなキャリアの機会を探索し、教育を変革するチームに参加',
        
        'careers.filter.all': 'すべてのポジション',
        'careers.filter.creative': 'クリエイティブ',
        'careers.filter.technical': 'テクニカル',
        'careers.filter.management': 'マネジメント',
        
        'careers.meta.location': 'セブ市',
        'careers.meta.experience': '年以上',
        'careers.responsibilities': '責任:',
        'careers.qualifications': '資格:',
        'careers.apply': '今すぐ応募',
        
        'careers.modal.title': '応募フォーム',
        'careers.form.name': '氏名',
        'careers.form.name.hint': '(姓、名、ミドルネーム)',
        'careers.form.email': 'メールアドレス',
        'careers.form.phone': '電話番号',
        'careers.form.address': '住所',
        'careers.form.resume': '履歴書/CV',
        'careers.form.resume.hint': '(PDF、DOC、またはDOCX形式)',
        'careers.form.upload': 'クリックしてアップロードまたはドラッグ&ドロップ',
        'careers.form.upload.hint': 'PDF、DOC、DOCX(最大10MB)',
        'careers.form.cancel': 'キャンセル',
        'careers.form.submit': '応募を提出',
        
        'careers.info.offer': '💼 提供内容',
        'careers.info.schedule': '🕐 勤務スケジュール',
        'careers.info.schedule.text': '朝シフト | 月曜日〜金曜日<br>午前8:00〜午後5:00(フレックスタイムあり)',
        'careers.info.location': '📍 所在地',
        'careers.info.location.text': 'セブビジネスパーク、セブ市、フィリピン<br>ハイブリッド勤務可能',
        'careers.info.questions': '📧 質問がありますか?',
        'careers.info.questions.text': 'このポジションと応募プロセスの詳細については、人事チームにお問い合わせください。',
        
        'careers.success.title': '応募完了!',
        'careers.success.message': 'チームへの参加に興味を持っていただきありがとうございます。応募を受け取り、慎重に検討いたします。5〜7営業日以内にご連絡いたします。',
        'careers.success.close': '閉じる',
        
        // About Us Page
        'aboutus.hero.title': '会社概要',
        'aboutus.hero.desc1': 'NX-STEPは、日本企業がeラーニングシステムを管理・最適化するのを支援する専門的なLMS管理およびバックオフィスサポートプロバイダーです。',
        'aboutus.hero.desc2': '私たちは、学習管理をより簡単で、よりスマートに、そして実際の企業での働き方により適合させるという単純な目標から始めました。',
        
        'aboutus.mission.title': 'ミッション',
        'aboutus.mission.text1': '私たちのミッションは、精度、一貫性、注意深さをもってeラーニングシステムを管理することにより、日本企業を支援することです。',
        'aboutus.mission.text2': '学習が十分にサポートされると、組織は知識だけでなく、文化と効率の面でも強くなると信じています。',
        
        'aboutus.vision.title': 'ビジョン',
        'aboutus.vision.item1': '<strong>プロフェッショナリズム:</strong> すべてのタスクで高い基準を維持します。',
        'aboutus.vision.item2': '<strong>明確性:</strong> コミュニケーションをシンプルで正確、そして文化的に適切にするよう努めます。',
        'aboutus.vision.item3': '<strong>コミットメント:</strong> 一貫した結果と継続的な改善を提供します。',
        'aboutus.vision.item4': '<strong>尊重:</strong> すべてのクライアント関係を信頼に基づくパートナーシップとして大切にします。',
        
        'aboutus.values.title': 'コアバリュー',
        'aboutus.value1': '<strong>誠実性</strong> — 正直さと透明性をもって運営します。',
        'aboutus.value2': '<strong>卓越性</strong> — すべてにおいて最高水準を目指します。',
        'aboutus.value3': '<strong>協力</strong> — パートナーとして、チームとして、一緒に成功します。',
        'aboutus.value4': '<strong>革新</strong> — クライアントの成功を高めるために技術を取り入れます。',
        
        'aboutus.founders.title': '創業者',
        'aboutus.building.title': 'ビル',
        'aboutus.building.text': '当社のオフィスは、フィリピン、セブ市、ヒッポドロモ、セブビジネスパーク、スミロン通りとカーディナルロサレス通りの角にある2Quadビルディング12階、ユニットC-2にあります。この中心的な場所により、パートナーやクライアントにより良いサービスを提供できます。セブ市のオフィスへのご訪問を歓迎します。',
        
        'aboutus.map.title': 'グーグルマップ',
        'aboutus.map.text': 'インタラクティブなGoogleマップを使用して、セブ市の当社オフィスを簡単に見つけることができます。マップには、訪問を案内するための明確な道順と近くのランドマークが表示されます。便宜上、拡大したり、詳細なナビゲーションのために大きな地図を表示したりできます。',
        
        'aboutus.teams.title': 'チーム',
        'aboutus.teams.desc1': 'NX-STEPの背後には、学習運用をシームレスで効果的にするという一つのビジョンを共有するLMS管理者、サポートスペシャリスト、バイリンガルコーディネーターのグループがいます。',
        'aboutus.teams.desc2': '私たちのチームは、日本企業が詳細、品質、信頼性を重視することを理解しており、それがまさに私たちが毎日働く方法です。',
        
        // Contact Page
        'contact.hero.title': 'お問い合わせ',
        'contact.hero.description': 'お問い合わせください。お手伝いします!LMSサポートサービスに関する質問、技術支援が必要、またはデモをリクエストしたい場合は、お気軽にお問い合わせください。',
        'contact.header': '情報詳細',
        
        'contact.form.firstname': '名',
        'contact.form.lastname': '姓',
        'contact.form.email': 'メールアドレス',
        'contact.form.subject': '件名',
        'contact.form.message': 'メッセージ',
        'contact.form.submit': '送信',
        
        'contact.info.title': '他のお問い合わせ',
        'contact.info.text': 'メールでお問い合わせください',
        'contact.info.email': 'support@nx-step.org',
        'contact.info.visit': 'または、当社のオフィスにご訪問ください。',
        
        'contact.success.title': '✓ メッセージ送信完了!',
        'contact.success.message': 'お問い合わせいただきありがとうございます。メッセージを受け取りました。すぐにご連絡いたします。',
        'contact.success.close': '閉じる',
        
        // Footer
        'footer.partner': 'パートナー:',
        'footer.partner.name': 'NX-SYS CORPORATION',
        'footer.location': '所在地:',
        'footer.address': 'フィリピン、セブ市、ヒッポドロモ、セブビジネスパーク、スミロン通りとカーディナルロサレス通りの角、2Quadビル12階、ユニットC-2'
    }
};

// ================= LANGUAGE SWITCHER =================
class LanguageSwitcher {
    constructor() {
        this.currentLang = localStorage.getItem('preferredLanguage') || 'en';
        this.languageBtn = document.querySelector('.language-btn');
        this.languageIcon = document.querySelector('.language-icon');
        this.init();
    }
    
    init() {
        // Set initial language
        this.setLanguage(this.currentLang, false);
        
        // Add click event
        if (this.languageBtn) {
            this.languageBtn.addEventListener('click', () => this.toggleLanguage());
        }
        
        // Update icon based on current language
        this.updateIcon();
    }
    
    toggleLanguage() {
        const newLang = this.currentLang === 'en' ? 'ja' : 'en';
        this.setLanguage(newLang, true);
    }
    
    setLanguage(lang, animate = true) {
        this.currentLang = lang;
        localStorage.setItem('preferredLanguage', lang);
        
        if (animate) {
            this.animateTranslation(() => {
                this.translatePage();
                this.updateIcon();
            });
        } else {
            this.translatePage();
            this.updateIcon();
        }
    }
    
    animateTranslation(callback) {
        // Add fade-out class to body
        document.body.style.transition = 'opacity 0.3s ease';
        document.body.style.opacity = '0.7';
        
        // Wait for fade-out, then translate and fade-in
        setTimeout(() => {
            callback();
            document.body.style.opacity = '1';
            
            // Add subtle scale animation to changed elements
            const elements = document.querySelectorAll('[data-translate]');
            elements.forEach((el, index) => {
                el.style.transition = 'transform 0.3s ease';
                el.style.transform = 'scale(0.98)';
                
                setTimeout(() => {
                    el.style.transform = 'scale(1)';
                }, 50 + (index * 10));
            });
        }, 300);
    }
    
    translatePage() {
        const elements = document.querySelectorAll('[data-translate]');
        
        elements.forEach(el => {
            const key = el.getAttribute('data-translate');
            const translation = translations[this.currentLang][key];
            
            if (translation) {
                // Check if element has data-translate-attr for attribute translation
                const attr = el.getAttribute('data-translate-attr');
                
                if (attr) {
                    el.setAttribute(attr, translation);
                } else {
                    el.innerHTML = translation;
                }
            }
        });
        
        // Update language button text
        if (this.languageBtn) {
            const langText = this.languageBtn.querySelector('.language-icon').nextSibling;
            if (langText) {
                langText.textContent = this.currentLang === 'en' ? 'japanese' : 'English';
            }
        }
    }
    
    updateIcon() {
        if (this.languageIcon) {
            // Animate icon change
            this.languageIcon.style.transition = 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
            this.languageIcon.style.transform = 'rotate(180deg) scale(1.1)';
            
            setTimeout(() => {
                this.languageIcon.textContent = this.currentLang === 'en' ? '🌐' : '🇯🇵';
                this.languageIcon.style.transform = 'rotate(360deg) scale(1)';
            }, 200);
        }
    }
}

// ================= INITIALIZE ON DOM LOAD =================
document.addEventListener('DOMContentLoaded', () => {
    const languageSwitcher = new LanguageSwitcher();
    
    // Add smooth transition to language button
    const languageBtn = document.querySelector('.language-btn');
    if (languageBtn) {
        languageBtn.style.position = 'relative';
        languageBtn.style.overflow = 'hidden';
    }
});


