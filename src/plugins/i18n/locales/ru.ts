export default {
  loading: 'Загрузка...',
  continue: 'Продолжить',
  confirm: 'Подтвердить',
  sending: 'Отправка...',

  chooseTariff: 'Выбор тарифа',
  changeTariff: 'Изменить тариф',
  products: 'Продукты',
  productsSum: 'Сумма товаров',
  selectTariff: 'Выберите тариф',
  initialPayment: 'Первоначальный взнос',
  totalAmount: 'Итоговая сумма',
  currency: 'сум',
  month: 'месяц',
  date: 'Дата',
  sum: 'Сумма',
  add: 'Добавить',

  main: {
    title: 'Оформление',
    enterSMS: 'Введите SMS-код',
    smsWasSent: 'SMS-код был выслан на телефонный номер',
    enterSMSToContinue: 'Введите его ниже, чтобы продолжить.',
    requestCode: 'Запросить код повторно',
    resendTimer: 'До повторной отправки: {time}',
    resendRequest: 'Вы сможете запросить повторную отправку через',
  },

  userInfo: {
    title: 'Ваши данные',
    fullName: 'Ф.И.О',
    sex: 'Пол',
    birthDate: 'Дата рождения',
    phone: 'Номер телефона',
    pinfl: 'ПНФЛ',
    tin: 'ИНН',
    address: 'Адрес',
    note: 'Пожалуйста, убедитесь, что указанные персональные данные верны, и подтвердите их.',
  },

  form: {
    phone: 'Номер телефона',
    passport: 'Серия / номер паспорта',
    birthDate: 'Дата рождения',
    agreement: `Я соглашаюсь с условиями <a href="#" target="_blank">публичной оферты</a> и даю свое согласие на обработку и использование моих персональных данных`,
  },

  confirmations: {
    warning: 'Текст предупреждения тест тест тест тест тест!',

    hashError: 'Невалидный хэш',
    backToMain: 'Вас вернёт на страницу авторизации, все заполненные раннее данные не будут сохранены',

    auth: 'Сначала пройдите авторизацию',
    tariff: 'Сначала выберите тариф',

    accept: 'Ок',
    reject: 'Отменить',

    delete: 'Deletion',
    deleteDescription: 'Are you sure you want to delete?',
  },

  statuses: {
    approved: {
      title: 'Approved',
      description: 'Approved description',
    },
    rejected: {
      title: 'Rejected',
      description: 'Rejected description',
    },
    close: {
      title: 'Эта сессия больше неактуальна',
      description: 'Данные устарели и использовать её нельзя. Пожалуйста, закройте вкладку.',
    },
  },

  rules: {
    required: 'Обязательное поле!',
    minLength: 'Длина должна быть больше {opt}',
    minValue: 'Значение должно быть больше {opt}',
    invalidDate: 'Дата указана неверно! Введите дату в формате "день/месяц/год"',
  },

  toast: {
    success: 'Успешно',
    error: 'Ошибка',
    warn: 'Предупреждение',
    info: 'Информация',
  },
};
