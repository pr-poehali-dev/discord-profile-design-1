import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Icon from "@/components/ui/icon";

const Index = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    discord: "",
    telegram: "",
    designDescription: "",
    customBackground: null as File | null
  });

  const services = [
    { id: "avatar", name: "Аватар", price: 500 },
    { id: "banner", name: "Баннер", price: 800 },
    { id: "avatar-banner", name: "Аватар + Баннер", price: 1200 },
    { id: "custom-bg", name: "Дизайн по своему фону", price: 1000 },
    { id: "animated-banner", name: "Анимированный баннер", price: 1500 },
    { id: "animated-avatar", name: "Анимированный аватар", price: 1200 },
    { id: "animated-set", name: "Анимированный набор", price: 2000 },
  ];

  const reviews = [
    { name: "Alex", rating: 5, text: "Невероятный дизайн! Все сделано качественно и быстро" },
    { name: "Maria", rating: 5, text: "Профиль выглядит потрясающе, много комплиментов получаю" },
    { name: "Dmitry", rating: 5, text: "Анимированный баннер просто огонь! Рекомендую всем" },
  ];

  const handleServiceToggle = (serviceId: string, price: number) => {
    if (selectedServices.includes(serviceId)) {
      setSelectedServices(prev => prev.filter(id => id !== serviceId));
      setTotalPrice(prev => prev - price);
    } else {
      setSelectedServices(prev => [...prev, serviceId]);
      setTotalPrice(prev => prev + price);
    }
  };

  const navigationItems = [
    { id: "home", label: "Главная", icon: "Home" },
    { id: "services", label: "Услуги", icon: "Settings" },
    { id: "pricing", label: "Цены", icon: "Calculator" },
    { id: "order", label: "Заказать", icon: "ShoppingCart" },
    { id: "reviews", label: "Отзывы", icon: "Star" },
  ];

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="absolute top-20 left-20 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-white/3 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-radial from-white/10 via-transparent to-transparent blur-2xl"></div>
      </div>

      {/* Mirror reflection effect */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/5 to-transparent backdrop-blur-sm"></div>

      {/* Navigation */}
      <nav className="relative z-10 border-b border-white/10 backdrop-blur-md bg-black/50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="Palette" size={28} />
              <span className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Discord Design
              </span>
            </div>
            <div className="hidden md:flex space-x-8">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                    activeSection === item.id
                      ? "bg-white text-black shadow-lg shadow-white/20"
                      : "text-gray-300 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <Icon name={item.icon as any} size={18} />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="relative z-10 container mx-auto px-6 py-12">
        {activeSection === "home" && (
          <div className="text-center space-y-12">
            <div className="space-y-6">
              <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent animate-pulse">
                Discord Design
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                Профессиональный дизайн для вашего Discord профиля. 
                Аватары, баннеры, анимация - все для создания уникального образа
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 mt-16">
              {[
                { icon: "Image", title: "Уникальный дизайн", desc: "Каждый проект создается индивидуально" },
                { icon: "Zap", title: "Быстрое выполнение", desc: "Готовый результат за 24-48 часов" },
                { icon: "Award", title: "Высокое качество", desc: "Профессиональный подход к каждой детали" },
              ].map((feature, index) => (
                <Card key={index} className="bg-white/5 border-white/10 backdrop-blur-md hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
                  <CardContent className="p-8 text-center">
                    <Icon name={feature.icon as any} size={48} className="mx-auto mb-4 text-white" />
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-gray-300">{feature.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeSection === "services" && (
          <div className="space-y-12">
            <div className="text-center">
              <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Услуги
              </h2>
              <p className="text-xl text-gray-300">Выберите нужные опции для вашего Discord профиля</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => (
                <Card key={service.id} className="bg-white/5 border-white/10 backdrop-blur-md hover:bg-white/10 transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{service.name}</span>
                      <Badge variant="outline" className="border-white/20 text-white">
                        {service.price}₽
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 mb-4">
                      {service.id === "avatar" && "Стильный аватар под вашу тематику"}
                      {service.id === "banner" && "Красивый баннер для профиля"}
                      {service.id === "avatar-banner" && "Полный набор: аватар + баннер"}
                      {service.id === "custom-bg" && "Дизайн на основе вашего фона"}
                      {service.id === "animated-banner" && "Анимированный баннер с эффектами"}
                      {service.id === "animated-avatar" && "Анимированный аватар"}
                      {service.id === "animated-set" && "Полный анимированный набор"}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeSection === "pricing" && (
          <div className="space-y-12">
            <div className="text-center">
              <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Калькулятор цены
              </h2>
              <p className="text-xl text-gray-300">Рассчитайте стоимость вашего заказа</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              <Card className="bg-white/5 border-white/10 backdrop-blur-md">
                <CardHeader>
                  <CardTitle>Выберите услуги</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {services.map((service) => (
                    <div key={service.id} className="flex items-center space-x-3 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                      <Checkbox
                        id={service.id}
                        checked={selectedServices.includes(service.id)}
                        onCheckedChange={() => handleServiceToggle(service.id, service.price)}
                        className="border-white/20"
                      />
                      <label htmlFor={service.id} className="flex-1 cursor-pointer">
                        <div className="flex justify-between items-center">
                          <span>{service.name}</span>
                          <Badge variant="outline" className="border-white/20 text-white">
                            {service.price}₽
                          </Badge>
                        </div>
                      </label>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-white/10 border-white/20 backdrop-blur-md">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Icon name="Calculator" size={24} />
                    <span>Итоговая стоимость</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center space-y-6">
                    <div className="text-6xl font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                      {totalPrice}₽
                    </div>
                    <p className="text-gray-300">
                      Выбрано услуг: {selectedServices.length}
                    </p>
                    <Button 
                      className="w-full bg-white text-black hover:bg-gray-200 transition-all duration-300 shadow-lg shadow-white/20"
                      onClick={() => setActiveSection("order")}
                      disabled={selectedServices.length === 0}
                    >
                      Оформить заказ
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeSection === "order" && (
          <div className="space-y-12">
            <div className="text-center">
              <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Оформление заказа
              </h2>
              <p className="text-xl text-gray-300">Заполните форму для создания заказа</p>
            </div>

            <Card className="max-w-2xl mx-auto bg-white/5 border-white/10 backdrop-blur-md">
              <CardContent className="p-8 space-y-6">
                <div className="space-y-4">
                  <label className="block text-sm font-medium">Ваш Discord</label>
                  <input 
                    type="text" 
                    placeholder="username#1234"
                    className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                </div>

                <div className="space-y-4">
                  <label className="block text-sm font-medium">Описание заказа / Пожелания</label>
                  <Textarea 
                    placeholder="Опишите что именно вы хотите..."
                    className="bg-white/10 border-white/20 text-white placeholder-gray-400 min-h-[120px] focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                </div>

                <div className="space-y-4">
                  <label className="block text-sm font-medium">Загрузить свой фон (если выбрана опция)</label>
                  <div className="border-2 border-dashed border-white/20 rounded-lg p-8 text-center hover:border-white/40 transition-colors cursor-pointer">
                    <Icon name="Upload" size={48} className="mx-auto mb-4 text-gray-400" />
                    <p className="text-gray-400">Перетащите файл или нажмите для выбора</p>
                  </div>
                </div>

                <div className="bg-white/10 p-6 rounded-lg">
                  <h3 className="font-semibold mb-4">Выбранные услуги:</h3>
                  {selectedServices.length > 0 ? (
                    <div className="space-y-2">
                      {selectedServices.map(serviceId => {
                        const service = services.find(s => s.id === serviceId);
                        return service ? (
                          <div key={serviceId} className="flex justify-between items-center">
                            <span>{service.name}</span>
                            <Badge variant="outline" className="border-white/20 text-white">
                              {service.price}₽
                            </Badge>
                          </div>
                        ) : null;
                      })}
                      <div className="border-t border-white/20 pt-2 mt-4">
                        <div className="flex justify-between items-center font-bold text-lg">
                          <span>Итого:</span>
                          <span>{totalPrice}₽</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-400">Сначала выберите услуги в калькуляторе</p>
                  )}
                </div>

                <Dialog open={isPaymentOpen} onOpenChange={setIsPaymentOpen}>
                  <DialogTrigger asChild>
                    <Button 
                      className="w-full bg-white text-black hover:bg-gray-200 transition-all duration-300 shadow-lg shadow-white/20 text-lg py-6"
                      disabled={selectedServices.length === 0}
                    >
                      Оформить и оплатить
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl bg-black border-white/20 text-white max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                        Оформление заказа
                      </DialogTitle>
                    </DialogHeader>
                    
                    <div className="space-y-6 pt-4">
                      {/* Personal Info */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-white">Контактная информация</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300">Ваше имя *</label>
                            <Input 
                              placeholder="Введите ваше имя"
                              value={formData.name}
                              onChange={(e) => setFormData({...formData, name: e.target.value})}
                              className="bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-white/50"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300">Discord *</label>
                            <Input 
                              placeholder="username#1234"
                              value={formData.discord}
                              onChange={(e) => setFormData({...formData, discord: e.target.value})}
                              className="bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-white/50"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-300">Telegram для связи *</label>
                          <Input 
                            placeholder="@username или ссылка"
                            value={formData.telegram}
                            onChange={(e) => setFormData({...formData, telegram: e.target.value})}
                            className="bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-white/50"
                          />
                        </div>
                      </div>

                      {/* Design Requirements */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-white">Описание дизайна</h3>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-300">Что вы хотите? Опишите подробно *</label>
                          <Textarea 
                            placeholder="Опишите детально какой дизайн вам нужен: стиль, цвета, тематику, персонажей, настроение... Чем больше деталей, тем лучше результат!"
                            value={formData.designDescription}
                            onChange={(e) => setFormData({...formData, designDescription: e.target.value})}
                            className="bg-white/10 border-white/20 text-white placeholder-gray-400 min-h-[120px] focus:border-white/50"
                          />
                        </div>
                      </div>

                      {/* File Upload */}
                      {selectedServices.includes('custom-bg') && (
                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold text-white">Загрузка фона</h3>
                          <div className="border-2 border-dashed border-white/20 rounded-lg p-6 text-center hover:border-white/40 transition-colors">
                            <Icon name="Upload" size={48} className="mx-auto mb-4 text-gray-400" />
                            <p className="text-gray-400 mb-2">Загрузите свой фон для дизайна</p>
                            <input 
                              type="file" 
                              accept="image/*"
                              className="text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-white/10 file:text-white hover:file:bg-white/20"
                              onChange={(e) => setFormData({...formData, customBackground: e.target.files?.[0] || null})}
                            />
                          </div>
                        </div>
                      )}

                      {/* Order Summary */}
                      <div className="bg-white/5 p-6 rounded-lg border border-white/10">
                        <h3 className="font-semibold mb-4 text-white">Сводка заказа</h3>
                        {selectedServices.length > 0 ? (
                          <div className="space-y-3">
                            {selectedServices.map(serviceId => {
                              const service = services.find(s => s.id === serviceId);
                              return service ? (
                                <div key={serviceId} className="flex justify-between items-center">
                                  <span className="text-gray-300">{service.name}</span>
                                  <Badge variant="outline" className="border-white/20 text-white">
                                    {service.price}₽
                                  </Badge>
                                </div>
                              ) : null;
                            })}
                            <div className="border-t border-white/20 pt-3 mt-4">
                              <div className="flex justify-between items-center font-bold text-lg">
                                <span>Итого к оплате:</span>
                                <span className="text-2xl bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">{totalPrice}₽</span>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <p className="text-gray-400">Сначала выберите услуги</p>
                        )}
                      </div>

                      {/* Payment Button */}
                      <div className="flex gap-4">
                        <Button 
                          variant="outline"
                          onClick={() => setIsPaymentOpen(false)}
                          className="flex-1 border-white/20 text-white hover:bg-white/10"
                        >
                          Отмена
                        </Button>
                        <Button 
                          className="flex-1 bg-white text-black hover:bg-gray-200 transition-all duration-300 shadow-lg shadow-white/20"
                          disabled={!formData.name || !formData.discord || !formData.telegram || !formData.designDescription || selectedServices.length === 0}
                          onClick={() => {
                            alert('Заказ успешно оформлен! Мы свяжемся с вами в Telegram для оплаты.');
                            setIsPaymentOpen(false);
                          }}
                        >
                          <Icon name="CreditCard" size={20} className="mr-2" />
                          Оформить заказ на {totalPrice}₽
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          </div>
        )}

        {activeSection === "reviews" && (
          <div className="space-y-12">
            <div className="text-center">
              <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Отзывы клиентов
              </h2>
              <p className="text-xl text-gray-300">Что говорят о нашей работе</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {reviews.map((review, index) => (
                <Card key={index} className="bg-white/5 border-white/10 backdrop-blur-md hover:bg-white/10 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-1 mb-4">
                      {[...Array(review.rating)].map((_, i) => (
                        <Icon key={i} name="Star" size={20} className="text-white fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-300 mb-4 italic">"{review.text}"</p>
                    <p className="font-semibold">— {review.name}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;