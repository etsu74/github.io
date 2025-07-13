// 画像配列 - images フォルダ内の画像ファイル名を追加
const imagesList = [
    'startup-1.jpg',
    'startup-2.jpg',
    'startup-3.jpg',
    'business-1.jpg',
    'business-2.jpg',
    'business-3.jpg',
    'conference-1.jpg',
    'conference-2.jpg',
    'conference-3.jpg',
    'team-1.jpg',
    'team-2.jpg',
    'team-3.jpg'
];

// 現在表示中の画像インデックス
let currentHeroImageIndex = 0;
let currentRegistrationImageIndex = 0;

// テキストアニメーション設定
function setupTextAnimations() {
    console.log('Setting up text animations...');
    
    // タイピング効果の実行
    const heroTitle = document.getElementById('heroTitle');
    if (heroTitle) {
        console.log('Hero title element found, starting typing effect...');
        // 少し遅延してからタイピング効果を開始
        setTimeout(() => {
            startTypingEffect(heroTitle, '起業ワークショップ #3');
        }, 500);
    } else {
        console.error('Hero title element not found!');
    }
}

// タイピング効果
function startTypingEffect(element, text) {
    console.log('Starting typing effect for:', text);
    
    // 元のテキストをクリア
    element.innerHTML = '';
    element.style.opacity = '1';
    
    // 各文字を span 要素で包む
    const chars = text.split('');
    
    chars.forEach((char, index) => {
        setTimeout(() => {
            const span = document.createElement('span');
            span.classList.add('typing-char');
            span.textContent = char;
            span.style.opacity = '0';
            element.appendChild(span);
            
            // 文字を表示するアニメーション
            setTimeout(() => {
                span.style.opacity = '1';
                span.style.transform = 'translateY(0) scale(1)';
            }, 50);
            
            console.log(`Typed character ${index + 1}: "${char}"`);
        }, index * 150); // 150ms間隔で文字を追加
    });
    
    // タイピングカーソルを追加
    setTimeout(() => {
        const cursor = document.createElement('span');
        cursor.classList.add('typing-cursor');
        element.appendChild(cursor);
        
        // カーソルを一定時間後に非表示
        setTimeout(() => {
            if (cursor.parentNode) {
                cursor.style.display = 'none';
            }
        }, 2000);
    }, chars.length * 150 + 200);
    
    console.log('Typing effect setup complete');
}

// スプラッシュアニメーション用のパーティクル効果（長時間ズームアウト対応）
function createSplashParticles() {
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (!heroSubtitle) return;
    
    // パーティクルコンテナを作成
    const particleContainer = document.createElement('div');
    particleContainer.classList.add('splash-particles');
    heroSubtitle.parentNode.insertBefore(particleContainer, heroSubtitle.nextSibling);
    
    // パーティクルを生成（長時間ズームアウトに合わせてタイミング調整）
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            createParticle(particleContainer, i);
        }, 3500 + (i * 40)); // サブタイトルズームアウト中盤から
    }
}

// パーティクル生成（長時間ズームアウト効果に最適化）
function createParticle(container, index) {
    const particle = document.createElement('div');
    particle.classList.add('splash-particle');
    
    // ランダムな位置と色（より控えめに）
    const angle = (index * 45) + Math.random() * 20;
    const distance = 80 + Math.random() * 40;
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24'];
    
    particle.style.cssText = `
        position: absolute;
        width: 6px;
        height: 6px;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        border-radius: 50%;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        opacity: 0;
        animation: particleZoomOut 1.8s ease-out forwards;
        animation-delay: ${index * 0.1}s;
        --angle: ${angle}deg;
        --distance: ${distance}px;
    `;
    
    container.appendChild(particle);
    
    // パーティクルを一定時間後に削除
    setTimeout(() => {
        particle.remove();
    }, 2500);
}

// DOMが読み込まれた後に実行
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing...');
    
    // 画像の初期設定
    initializeImages();
    
    // 画像自動切り替えの開始
    startImageRotation();
    
    // テキストアニメーションの設定（最優先で実行）
    setupTextAnimations();
    
    // スプラッシュパーティクル効果の開始（長時間ズームアウト効果に合わせて調整）
    setTimeout(() => {
        createSplashParticles();
    }, 2000);
    
    // カウントダウンタイマーの開始
    console.log('Starting countdown timer...');
    updateCountdown(); // 即座に実行
    const countdownInterval = setInterval(updateCountdown, 1000);
    
    // カウントダウンが正常に動作しているかチェック
    setTimeout(() => {
        const daysElement = document.getElementById('days');
        if (daysElement && daysElement.textContent === '00') {
            console.warn('Countdown may not be working properly');
        }
    }, 2000);
    
    // スクロールエフェクトの設定
    setupScrollEffects();
    
    // 初期表示アニメーションの設定
    setupInitialAnimations();
});

// 画像初期化
function initializeImages() {
    const heroBackground = document.getElementById('heroBackground');
    const registrationBackground = document.getElementById('registrationBackground');
    
    if (heroBackground && imagesList.length > 0) {
        heroBackground.style.backgroundImage = `url('images/${imagesList[0]}')`;
    }
    
    if (registrationBackground && imagesList.length > 1) {
        registrationBackground.style.backgroundImage = `url('images/${imagesList[1]}')`;
    }
}

// 画像ローテーション開始
function startImageRotation() {
    // ヒーローセクションの画像切り替え（5秒間隔）
    setInterval(() => {
        rotateHeroImage();
    }, 5000);
    
    // 登録セクションの画像切り替え（7秒間隔）
    setInterval(() => {
        rotateRegistrationImage();
    }, 7000);
}

// ヒーローセクション画像切り替え
function rotateHeroImage() {
    const heroBackground = document.getElementById('heroBackground');
    if (!heroBackground || imagesList.length === 0) return;
    
    currentHeroImageIndex = (currentHeroImageIndex + 1) % imagesList.length;
    const randomImage = getRandomImage();
    
    heroBackground.style.backgroundImage = `url('images/${randomImage}')`;
}

// 登録セクション画像切り替え
function rotateRegistrationImage() {
    const registrationBackground = document.getElementById('registrationBackground');
    if (!registrationBackground || imagesList.length === 0) return;
    
    currentRegistrationImageIndex = (currentRegistrationImageIndex + 1) % imagesList.length;
    const randomImage = getRandomImage();
    
    registrationBackground.style.backgroundImage = `url('images/${randomImage}')`;
}

// ランダム画像取得
function getRandomImage() {
    if (imagesList.length === 0) return '';
    const randomIndex = Math.floor(Math.random() * imagesList.length);
    return imagesList[randomIndex];
}

// 画像プリロード（パフォーマンス向上）
function preloadImages() {
    imagesList.forEach(imageName => {
        const img = new Image();
        img.src = `images/${imageName}`;
    });
}

// カウントダウンタイマー更新
function updateCountdown() {
    try {
        // 2025年8月15日 13:00 JST
        const targetDate = new Date(2025, 7, 15, 13, 0, 0).getTime(); // 月は0ベースなので7=8月
        const now = new Date().getTime();
        const difference = targetDate - now;

        console.log('Target Date:', new Date(targetDate));
        console.log('Current Date:', new Date(now));
        console.log('Difference (ms):', difference);

        if (difference > 0) {
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            console.log(`Countdown: ${days}d ${hours}h ${minutes}m ${seconds}s`);

            updateCountdownElement('days', days);
            updateCountdownElement('hours', hours);
            updateCountdownElement('minutes', minutes);
            updateCountdownElement('seconds', seconds);
        } else {
            // カウントダウン終了時の処理
            console.log('Countdown ended');
            updateCountdownElement('days', 0);
            updateCountdownElement('hours', 0);
            updateCountdownElement('minutes', 0);
            updateCountdownElement('seconds', 0);
            
            // カウントダウン終了メッセージ表示
            showCountdownEndMessage();
        }
    } catch (error) {
        console.error('Countdown error:', error);
        // エラー時は現在時刻を表示
        const now = new Date();
        updateCountdownElement('days', now.getDate());
        updateCountdownElement('hours', now.getHours());
        updateCountdownElement('minutes', now.getMinutes());
        updateCountdownElement('seconds', now.getSeconds());
    }
}

// カウントダウン要素更新
function updateCountdownElement(elementId, value) {
    const element = document.getElementById(elementId);
    if (element) {
        const formattedValue = value.toString().padStart(2, '0');
        element.textContent = formattedValue;
        console.log(`Updated ${elementId}: ${formattedValue}`);
    } else {
        console.warn(`Element not found: ${elementId}`);
    }
}

// カウントダウン終了メッセージ
function showCountdownEndMessage() {
    const countdownContainer = document.querySelector('.countdown-container');
    if (countdownContainer) {
        countdownContainer.innerHTML = `
            <div class="countdown-title" style="font-size: 1.5rem; color: #ff6b6b;">
                🎉 ワークショップ開催中！ 🎉
            </div>
        `;
    }
}

// スムーススクロール
function scrollToRegistration() {
    const registrationSection = document.getElementById('registration');
    if (registrationSection) {
        registrationSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// フォーム送信設定
function setupFormSubmission() {
    const form = document.getElementById('registrationForm');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        handleFormSubmission();
    });
}

// Google Form設定
const GOOGLE_FORM_CONFIG = {
    // ここにGoogle FormのURLを設定
    formUrl: 'https://docs.google.com/forms/d/e/[YOUR_FORM_ID]/formResponse',
    
    // ここに各フィールドのentry IDを設定
    fields: {
        name: 'entry.123456789',        // 氏名フィールドのID
        email: 'entry.987654321',       // メールフィールドのID
        affiliation: 'entry.555666777', // 所属フィールドのID
        motivation: 'entry.111222333'   // 参加動機フィールドのID
    }
};

// フォーム送信処理（Google Form対応版）
function handleFormSubmission() {
    const submitButton = document.getElementById('submitButton');
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');
    
    // メッセージを非表示
    hideMessage(successMessage);
    hideMessage(errorMessage);
    
    // 送信ボタンを無効化
    setButtonLoading(submitButton, true);
    
    // バリデーション
    const validationResult = validateForm();
    if (!validationResult.isValid) {
        showErrorMessage(errorMessage, validationResult.message);
        setButtonLoading(submitButton, false);
        return;
    }
    
    // フォームデータを取得
    const formData = getFormData();
    
    // Google Formに送信
    submitToGoogleForm(formData)
        .then(() => {
            // 成功処理
            showSuccessMessage(successMessage);
            resetForm();
            setButtonLoading(submitButton, false);
            
            // 3秒後にメッセージを非表示
            setTimeout(() => {
                hideMessage(successMessage);
            }, 3000);
        })
        .catch((error) => {
            console.error('Form submission error:', error);
            showErrorMessage(errorMessage, '送信に失敗しました。しばらく後に再度お試しください。');
            setButtonLoading(submitButton, false);
        });
}

// フォームデータ取得
function getFormData() {
    return {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        affiliation: document.getElementById('affiliation').value.trim(),
        motivation: document.getElementById('motivation').value.trim()
    };
}

// Google Formへの送信
function submitToGoogleForm(data) {
    return new Promise((resolve, reject) => {
        try {
            // FormDataオブジェクトを作成
            const formData = new FormData();
            
            // Google FormのフィールドIDに対応してデータを設定
            formData.append(GOOGLE_FORM_CONFIG.fields.name, data.name);
            formData.append(GOOGLE_FORM_CONFIG.fields.email, data.email);
            formData.append(GOOGLE_FORM_CONFIG.fields.affiliation, data.affiliation);
            
            // 参加動機は任意項目
            if (data.motivation) {
                formData.append(GOOGLE_FORM_CONFIG.fields.motivation, data.motivation);
            }
            
            // Google Formに送信
            fetch(GOOGLE_FORM_CONFIG.formUrl, {
                method: 'POST',
                body: formData,
                mode: 'no-cors' // CORSエラーを回避
            })
            .then(() => {
                console.log('Form submitted successfully to Google Form');
                resolve();
            })
            .catch((error) => {
                console.error('Failed to submit to Google Form:', error);
                // no-corsモードでは実際のエラーは取得できないため、
                // タイムアウトで成功とみなす
                setTimeout(resolve, 1000);
            });
            
        } catch (error) {
            console.error('Form submission error:', error);
            reject(error);
        }
    });
}

// フォームバリデーション
function validateForm() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const affiliation = document.getElementById('affiliation').value.trim();
    
    if (!name || !email || !affiliation) {
        return {
            isValid: false,
            message: '必須項目をすべて入力してください。'
        };
    }
    
    // メールアドレスの形式チェック
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        return {
            isValid: false,
            message: '正しいメールアドレスを入力してください。'
        };
    }
    
    return { isValid: true, message: '' };
}

// メッセージ表示/非表示
function showSuccessMessage(element) {
    if (element) {
        element.style.display = 'block';
        element.style.animation = 'slideInUp 0.5s ease-out';
    }
}

function showErrorMessage(element, message) {
    if (element) {
        element.textContent = message;
        element.style.display = 'block';
        element.style.animation = 'slideInUp 0.5s ease-out';
    }
}

function hideMessage(element) {
    if (element) {
        element.style.display = 'none';
    }
}

// ボタン状態管理
function setButtonLoading(button, isLoading) {
    if (!button) return;
    
    if (isLoading) {
        button.disabled = true;
        button.textContent = '送信中...';
        button.style.opacity = '0.7';
    } else {
        button.disabled = false;
        button.textContent = '事前登録を完了する';
        button.style.opacity = '1';
    }
}

// フォームリセット
function resetForm() {
    const form = document.getElementById('registrationForm');
    if (form) {
        form.reset();
    }
}

// スクロールエフェクト設定
function setupScrollEffects() {
    window.addEventListener('scroll', handleScroll);
}

// スクロール処理
function handleScroll() {
    const scrolled = window.pageYOffset;
    const heroSection = document.querySelector('.hero-section');
    
    // パララックス効果
    if (heroSection) {
        heroSection.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
    
    // スクロール位置に応じた要素のフェードイン
    handleScrollFadeIn();
}

// スクロールによるフェードイン効果
function handleScrollFadeIn() {
    const elements = document.querySelectorAll('.workshop-details, .registration-form');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// 初期表示アニメーション設定
function setupInitialAnimations() {
    const elements = document.querySelectorAll('.hero-content > *');
    elements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.3}s`;
    });
    
    // 登録セクションの要素を初期状態で非表示に
    const fadeElements = document.querySelectorAll('.workshop-details, .registration-form');
    fadeElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    });
    
    // 画像のプリロード開始
    preloadImages();
}

// ウィンドウリサイズ対応
window.addEventListener('resize', function() {
    // レスポンシブ対応の追加処理があればここに記述
    handleResponsiveAdjustments();
});

// レスポンシブ調整
function handleResponsiveAdjustments() {
    const windowWidth = window.innerWidth;
    
    // モバイル端末での調整
    if (windowWidth <= 768) {
        adjustMobileLayout();
    } else {
        resetDesktopLayout();
    }
}

// モバイルレイアウト調整
function adjustMobileLayout() {
    const countdownTimer = document.querySelector('.countdown-timer');
    if (countdownTimer) {
        countdownTimer.style.gap = '0.5rem';
    }
}

// デスクトップレイアウトリセット
function resetDesktopLayout() {
    const countdownTimer = document.querySelector('.countdown-timer');
    if (countdownTimer) {
        countdownTimer.style.gap = '1rem';
    }
}

// エラーハンドリング
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    
    // 重要な機能が動作しない場合のフォールバック
    const heroBackground = document.getElementById('heroBackground');
    const registrationBackground = document.getElementById('registrationBackground');
    
    if (heroBackground && !heroBackground.style.backgroundImage) {
        heroBackground.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    }
    
    if (registrationBackground && !registrationBackground.style.backgroundImage) {
        registrationBackground.style.background = 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)';
    }
});

// 画像読み込みエラー対応
function handleImageError(imageName) {
    console.warn(`Image not found: ${imageName}`);
    
    // フォールバック用のグラデーション背景
    return 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
}

// パフォーマンス最適化
function optimizePerformance() {
    // 不要なアニメーションの停止（バッテリー節約）
    if (navigator.getBattery) {
        navigator.getBattery().then(function(battery) {
            if (battery.level < 0.2) {
                // バッテリー残量が少ない場合はアニメーションを削減
                document.body.classList.add('reduced-motion');
            }
        });
    }
}

// ユーザビリティ向上
function enhanceUserExperience() {
    // キーボードナビゲーション対応
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && e.target.classList.contains('cta-button')) {
            scrollToRegistration();
        }
    });
    
    // フォーカス管理
    const inputs = document.querySelectorAll('input, textarea, button');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    });
}

// 初期化完了後の追加設定
window.addEventListener('load', function() {
    optimizePerformance();
    enhanceUserExperience();
    
    // 全ての画像が読み込まれた後のパフォーマンス改善
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 1000);
});

// 開発用デバッグ機能（本番環境では削除）
function debugInfo() {
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        console.log('Workshop Landing Page Debug Info:');
        console.log('Images loaded:', imagesList.length);
        console.log('Current hero image index:', currentHeroImageIndex);
        console.log('Current registration image index:', currentRegistrationImageIndex);
    }
}