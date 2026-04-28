## ФАЗА 5Б: SAAS / ЛИЧНЫЙ КАБИНЕТ (дополнительно)

### Удаление аккаунта (ст. 21 152-ФЗ — обязательно, 30 дней)

```javascript
// Двухэтапное удаление
async function requestAccountDeletion(userId) {
    await db.users.update(userId, {
        deletionRequestedAt: new Date(),
        status: 'pending_deletion',
    });
}

// Cron-задача: hard delete через 30 дней
async function processScheduledDeletions() {
    const cutoff = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const toDelete = await db.users.findAll({
        where: { deletionRequestedAt: { $lte: cutoff }, status: 'pending_deletion' },
    });
    for (const user of toDelete) {
        await hardDeleteUserData(user.id);
    }
}
```

### Выгрузка данных (ст. 14 152-ФЗ — ответ в 10 рабочих дней)

```javascript
async function exportUserData(userId) {
    const user = await db.users.findById(userId);
    const orders = await db.orders.findAll({ userId });
    return {
        profile: { name: user.name, email: user.email, phone: user.phone },
        orders: orders.map(o => ({ id: o.id, date: o.createdAt, total: o.total })),
        exportedAt: new Date().toISOString(),
    };
}
```

### B2B SaaS: договор поручения обработки ПДн
Если клиенты-компании используют SaaS для работы с ПДн своих пользователей — заключи договор поручения (ст. 6 ч. 3, ст. 21.1 152-ФЗ) с каждым B2B-клиентом.
