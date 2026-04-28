## ФАЗА 5В: МОБИЛЬНОЕ ПРИЛОЖЕНИЕ (iOS / Android / React Native)

### Отличия от веб-сайта

| Параметр | Веб | Мобильное |
|----------|-----|-----------|
| Cookie-баннер | Обязателен | Не применим |
| Согласие | Чекбокс в форме | Экран онбординга |
| Аналитика | Яндекс.Метрика | AppMetrica |
| Хранение | localStorage / БД | AsyncStorage / Keychain |

### Согласие при первом запуске (React Native)

```tsx
// screens/OnboardingConsentScreen.tsx
import { useState } from 'react';
import { View, Text, Switch, Pressable, Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function OnboardingConsentScreen({ onComplete }: { onComplete: () => void }) {
    const [consentPdp, setConsentPdp] = useState(false);
    const [consentAnalytics, setConsentAnalytics] = useState(false);

    async function handleContinue() {
        if (!consentPdp) return;
        await AsyncStorage.setItem('pdp_consent', JSON.stringify({
            pdp: true, analytics: consentAnalytics, ts: Date.now(),
        }));
        onComplete();
    }

    return (
        <View style={{ flex: 1, padding: 24, justifyContent: 'center' }}>
            <Text style={{ fontSize: 24, fontWeight: '700', marginBottom: 32 }}>Прежде чем начать</Text>

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                <Text style={{ flex: 1, marginRight: 12 }}>
                    Принимаю{' '}
                    <Text style={{ color: '#0066cc', textDecorationLine: 'underline' }}
                          onPress={() => Linking.openURL('https://{{WEBSITE_URL}}/privacy-policy')}>
                        Политику конфиденциальности
                    </Text>
                </Text>
                <Switch value={consentPdp} onValueChange={setConsentPdp} />
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
                <Text style={{ flex: 1, marginRight: 12 }}>Аналитика использования приложения</Text>
                <Switch value={consentAnalytics} onValueChange={setConsentAnalytics} />
            </View>

            <Pressable
                style={{ backgroundColor: consentPdp ? '#0066cc' : '#ccc', padding: 16, borderRadius: 10, alignItems: 'center' }}
                disabled={!consentPdp}
                onPress={handleContinue}
            >
                <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}>Продолжить</Text>
            </Pressable>
        </View>
    );
}
```

### AppMetrica вместо Firebase Analytics

```bash
npm install @appmetrica/react-native-analytics
```

```typescript
// lib/analytics.ts
import AppMetrica from '@appmetrica/react-native-analytics';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function initAnalytics() {
    const consent = JSON.parse(await AsyncStorage.getItem('pdp_consent') || 'null');
    if (!consent?.analytics) return;
    AppMetrica.activate({
        apiKey: '{{APPMETRICA_KEY}}',
        sessionTimeout: 30,
        locationTracking: false,
    });
}
```

### Настройки приложения — обязательный раздел

```tsx
function PrivacySection() {
    return (
        <View>
            <Pressable onPress={() => Linking.openURL('https://{{WEBSITE_URL}}/privacy-policy')}>
                <Text>Политика конфиденциальности</Text>
            </Pressable>
            <Pressable onPress={() => Linking.openURL('https://{{WEBSITE_URL}}/consent')}>
                <Text>Согласие на обработку ПДн</Text>
            </Pressable>
            <Pressable onPress={handleDeleteAccount}>
                <Text style={{ color: 'red' }}>Удалить аккаунт и данные</Text>
            </Pressable>
        </View>
    );
}
```
