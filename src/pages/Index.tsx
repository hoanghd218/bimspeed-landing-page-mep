import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import BimSpeedLogo from "@/components/BimSpeedLogo";
import { 
  Check, 
  Shield, 
  Users, 
  Download, 
  Zap, 
  Settings, 
  Clock,
  Lock,
  Facebook,
  Youtube,
  MessageCircle,
  Phone,
  Globe,
  ChevronDown
} from "lucide-react";

const Index = () => {
  const [isHeaderSticky, setIsHeaderSticky] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    company: "",
  });

  // Sticky header effect
  useEffect(() => {
    const handleScroll = () => {
      setIsHeaderSticky(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Countdown timer
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(23, 59, 59, 999);
      const difference = tomorrow.getTime() - now.getTime();

      setTimeLeft({
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  const scrollToForm = () => {
    document.getElementById("hero-form")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Vietnamese phone validation
    const phoneRegex = /^(0|\+84)[3|5|7|8|9][0-9]{8}$/;
    if (!phoneRegex.test(formData.phone)) {
      toast({
        title: "❌ Số điện thoại không hợp lệ",
        description: "Vui lòng nhập số điện thoại hợp lệ (VD: 0936340576)",
        variant: "destructive",
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "❌ Email không hợp lệ",
        description: "Vui lòng nhập địa chỉ email hợp lệ",
        variant: "destructive",
      });
      return;
    }

    try {
      // Call n8n webhook
      const webhookUrl = "https://n8n.bimspeed.net/webhook/ad6d9441-4e7e-47be-a155-526aa1848369";
      
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          phone: formData.phone,
          email: formData.email,
          address: formData.company,
          leadSource: "Website",
          fromWebsite: window.location.href,
        }),
      });

      if (response.ok) {
        // Success - Show thank you page
        setIsSubmitted(true);
        
        // Reset form
        setFormData({ fullName: "", email: "", phone: "", company: "" });
      } else {
        throw new Error("Webhook call failed");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      // Still show thank you page
      setIsSubmitted(true);
      
      // Reset form anyway
      setFormData({ fullName: "", email: "", phone: "", company: "" });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Thank You Page
  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center px-3 sm:px-4">
        <Card className="max-w-2xl w-full shadow-2xl border-2 border-accent">
          <CardContent className="pt-8 sm:pt-12 pb-6 sm:pb-8 text-center">
            <div className="mb-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-accent rounded-full flex items-center justify-center mx-auto mb-4 animate-scale-in">
                <Check className="w-8 h-8 sm:w-12 sm:h-12 text-accent-foreground" />
              </div>
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold font-heading mb-3 sm:mb-4 text-foreground">
                🎉 Đăng ký thành công!
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-muted-foreground mb-6 sm:mb-8">
                Cảm ơn bạn đã tin tưởng và sử dụng BimSpeed MEP Tool
              </p>
            </div>

            <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
              <div className="p-4 sm:p-6 bg-secondary rounded-xl border border-border text-left">
                <div className="flex items-start gap-2 sm:gap-3 mb-4">
                  <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-base sm:text-lg mb-2">Bước 1: Tham gia nhóm Zalo kỹ sư</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground mb-3">
                      Vào nhóm Zalo để nhận hỗ trợ kỹ thuật, hướng dẫn cài đặt và cập nhật phiên bản mới nhất
                    </p>
                    <Button 
                      variant="cta" 
                      size="lg" 
                      className="w-full text-xs sm:text-sm"
                      onClick={() => window.open("https://zalo.me/g/zaldon417", "_blank")}
                    >
                      <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                      Tham gia nhóm Zalo ngay
                    </Button>
                  </div>
                </div>
              </div>

              <div className="p-4 sm:p-6 bg-secondary rounded-xl border border-border text-left">
                <div className="flex items-start gap-2 sm:gap-3">
                  <Download className="w-5 h-5 sm:w-6 sm:h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-base sm:text-lg mb-2">Bước 2: Kiểm tra Email của bạn</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Chúng tôi đã gửi email chứa <span className="font-bold text-foreground">License Key</span> và hướng dẫn cài đặt chi tiết đến địa chỉ email bạn đã đăng ký.
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      💡 Nếu không thấy email, vui lòng kiểm tra thư mục Spam/Junk
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 sm:p-6 bg-primary/5 rounded-xl border border-primary/20 text-left">
                <div className="flex items-start gap-2 sm:gap-3">
                  <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-base sm:text-lg mb-2 text-primary">Bạn sẽ nhận được:</h3>
                    <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 sm:w-5 sm:h-5 text-accent flex-shrink-0 mt-0.5" />
                        <span>Link tải BimSpeed MEP Tool (Revit 2020-2025)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 sm:w-5 sm:h-5 text-accent flex-shrink-0 mt-0.5" />
                        <span>License Key kích hoạt miễn phí</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 sm:w-5 sm:h-5 text-accent flex-shrink-0 mt-0.5" />
                        <span>Video hướng dẫn cài đặt & sử dụng</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 sm:w-5 sm:h-5 text-accent flex-shrink-0 mt-0.5" />
                        <span>Hỗ trợ kỹ thuật từ team BimSpeed</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Button 
                variant="cta" 
                size="lg"
                className="text-xs sm:text-sm"
                onClick={() => window.open("https://zalo.me/g/zaldon417", "_blank")}
              >
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                Vào nhóm Zalo hỗ trợ
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="text-xs sm:text-sm"
                onClick={() => setIsSubmitted(false)}
              >
                Quay lại trang chủ
              </Button>
            </div>

            <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-border">
              <p className="text-xs sm:text-sm text-muted-foreground">
                <Phone className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1" />
                Cần hỗ trợ? Liên hệ: <span className="font-bold text-foreground">Ms Hiên – 0936 340 576</span>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isHeaderSticky 
            ? "bg-card/95 backdrop-blur-md shadow-md" 
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4 flex items-center justify-between">
          <BimSpeedLogo size="md" />
          <Button variant="hero" size="sm" className="text-xs sm:text-sm md:text-base" onClick={scrollToForm}>
            Nhận phần mềm
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="pt-20 sm:pt-24 md:pt-32 pb-12 sm:pb-16 md:pb-20 px-3 sm:px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center">
            {/* Left - Text */}
            <div className="space-y-4 sm:space-y-6 animate-fade-in">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-heading leading-tight text-foreground">
                Tăng tốc thiết kế MEP trong Revit – với BimSpeed MEP Tool miễn phí!
              </h1>
              <h4 className="text-sm sm:text-base md:text-lg text-muted-foreground">
                Nhận ngay công cụ giúp kỹ sư cơ điện (MEP) tự động tạo, xoay, căn chỉnh và quản lý hệ thống ống, co, fitting chỉ trong vài cú click. Tiết kiệm 70% thời gian thao tác Revit.
              </h4>
              
              <ul className="space-y-3">
                {[
                  "Dễ dùng – Cài đặt trong 2 phút",
                  "Tự động hóa thao tác thủ công",
                  "Giúp đồng bộ hệ thống ống chính xác tuyệt đối"
                ].map((benefit, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-6 h-6 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-foreground font-medium">{benefit}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-4">
                <Button variant="cta" size="xl" onClick={scrollToForm} className="w-full md:w-auto">
                  <Download className="w-5 h-5" />
                  NHẬN NGAY PHẦN MỀM MIỄN PHÍ
                  <ChevronDown className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Right - Form */}
            <Card id="hero-form" className="shadow-2xl border-2 animate-scale-in">
              <CardHeader>
                <CardTitle className="text-2xl font-heading flex items-center gap-2">
                  <Download className="w-6 h-6 text-primary" />
                  Đăng ký để nhận phần mềm miễn phí
                </CardTitle>
                <CardDescription>
                  Điền thông tin để nhận link tải và hướng dẫn cài đặt
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Họ và tên *</Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Nguyễn Văn A"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="email@example.com"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Số điện thoại *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="0936 340 576"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company">Công ty / Đơn vị *</Label>
                    <Input
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="Tên công ty"
                      required
                    />
                  </div>

                  <Button type="submit" variant="cta" size="xl" className="w-full">
                    NHẬN NGAY PHẦN MỀM MIỄN PHÍ
                  </Button>
                </form>

                {/* Countdown Timer & Special Offer - Compact */}
                <div className="mt-4 space-y-3">
                  {/* Countdown */}
                  <div className="">
                    <div className=" font-bold text-accent mb-2 flex items-center justify-center gap-1">
                      <Clock className="w-4 h-4" />
                      Ưu đãi hết hạn trong
                    </div>
                    <div className="flex justify-center gap-1 sm:gap-2">
                      {[
                        { label: "h", value: timeLeft.hours },
                        { label: "m", value: timeLeft.minutes },
                        { label: "s", value: timeLeft.seconds }
                      ].map((item, i) => (
                        <div key={i} className="text-center">
                          <div className="bg-accent text-accent-foreground rounded px-1.5 sm:px-2 py-1">
                            <div className=" font-bold font-number">{String(item.value).padStart(2, '0')}</div>
                          </div>
                          <div className="text-[10px] sm:text-xs text-muted-foreground mt-0.5">{item.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>

              
                </div>

                {/* Trust strip */}
                <div className="mt-4 p-3 sm:p-4 bg-secondary rounded-lg border border-border text-xs sm:text-sm">
                  <div className="flex gap-2 items-start">
                    <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <p className="text-foreground font-medium">
                        🔰 Hơn 500+ kỹ sư đã sử dụng BimSpeed MEP
                      </p>
                      <p className="text-muted-foreground">
                        👉 Cài đặt miễn phí ngay hôm nay!
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

        </div>
      </section>

      {/* Inside Section */}
      <section id="inside" className="py-20 px-4 bg-card">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
              Bên trong BimSpeed MEP bạn nhận được gì?
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: <Settings className="w-12 h-12 text-primary" />,
                title: "Bộ công cụ MEP hoàn chỉnh",
                description: "Tạo hệ thống ống, co, fitting và hanger chỉ trong vài giây. Hỗ trợ tự động xoay, align, bend, và tạo branch thông minh."
              },
              {
                icon: <Zap className="w-12 h-12 text-accent" />,
                title: "Tự động hóa thao tác Revit",
                description: "Từ việc xoay fitting, căn ống, nối branch đến gán hanger – tất cả chỉ với 1 click."
              },
              {
                icon: <Download className="w-12 h-12 text-primary" />,
                title: "Cài đặt dễ dàng",
                description: "Hoạt động mượt mà trên Revit 2020–2025, không xung đột add-in khác. Hướng dẫn chi tiết + video hướng dẫn kèm theo."
              }
            ].map((feature, i) => (
              <Card key={i} className="text-center hover:shadow-xl transition-shadow duration-300">
                <CardContent className="pt-8 pb-6">
                  <div className="flex justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold font-heading mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* YouTube Videos */}
          <div className="mt-16">
            <div className="text-center mb-8">
              <h3 className="text-2xl md:text-3xl font-bold font-heading mb-2">
                Xem demo công cụ hoạt động
              </h3>
              <p className="text-muted-foreground">
                Video hướng dẫn chi tiết cách sử dụng BimSpeed MEP Tool
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {[
                { id: "CN0KX_Or_wQ", title: "Demo BimSpeed MEP Tool #1" },
                { id: "bdH0dB3Wig0", title: "Demo BimSpeed MEP Tool #2" },
                { id: "34Ak9pMa5dY", title: "Demo BimSpeed MEP Tool #3" }
              ].map((video, i) => (
                <div key={i} className="aspect-video rounded-xl overflow-hidden shadow-lg border border-border hover:shadow-2xl transition-shadow duration-300">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${video.id}`}
                    title={video.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section id="proof" className="py-12 sm:py-16 md:py-20 px-3 sm:px-4">
        <div className="container mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-heading mb-4">
              Kỹ sư nói gì về BimSpeed MEP
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[
              {
                quote: "Trước đây tôi mất cả buổi chỉ để chỉnh ống gió và co. Giờ chỉ cần vài phút với BimSpeed MEP – đúng hướng, đúng cao độ, không lỗi!",
                author: "Anh Tuấn",
                role: "Kỹ sư MEP, TP.HCM",
              },
              {
                quote: "BimSpeed MEP giúp team tôi giảm 60% thời gian modeling MEP cho dự án khách sạn. Tool cực kỳ hữu ích!",
                author: "Ms Hiền",
                role: "BIM Coordinator, Hà Nội",
              },
              {
                quote: "Tính năng tự động tạo hanger và align ống nước rất tuyệt vời. Công việc hoàn thành nhanh gấp đôi so với trước kia!",
                author: "Anh Minh",
                role: "MEP Design Engineer, Đà Nẵng",
              },
              {
                quote: "Phần mềm dễ sử dụng, không cần học lâu là làm được ngay. Hỗ trợ nhiệt tình, cài đặt chỉ mất 5 phút!",
                author: "Chị Ngọc",
                role: "Kỹ sư HVAC, Hà Nội",
              },
              {
                quote: "Trước khi dùng BimSpeed, tôi phải xoay từng fitting thủ công. Giờ 1 click là xong hết. Thật sự tiết kiệm công sức!",
                author: "Anh Quang",
                role: "MEP Modeler, Bình Dương",
              },
              {
                quote: "Dự án cao ốc văn phòng của chúng tôi có hệ thống ống phức tạp. BimSpeed MEP giúp đồng bộ hóa toàn bộ hệ thống chỉ trong vài ngày thay vì vài tuần.",
                author: "Mr. Đức",
                role: "BIM Manager, TP.HCM",
              },
              {
                quote: "Công cụ tạo branch và nối ống thông minh quá! Không còn lo lỗi kết nối hay sai cao độ nữa. Recommend 100%!",
                author: "Anh Long",
                role: "Plumbing Engineer, Hải Phòng",
              },
              {
                quote: "Team MEP của công ty tôi đã thử nhiều tool khác nhưng BimSpeed vẫn là tốt nhất. Hỗ trợ đầy đủ Revit 2020-2025, không bị conflict.",
                author: "Ms Thảo",
                role: "Lead MEP Engineer, Hà Nội",
              },
              {
                quote: "Tôi làm freelance MEP cho nhiều dự án. BimSpeed giúp tôi giao hàng nhanh hơn, chất lượng tốt hơn. Khách hàng rất hài lòng!",
                author: "Anh Nam",
                role: "Freelance MEP Consultant, TP.HCM",
              },
              {
                quote: "Ban đầu tôi nghĩ phải mất công học tool mới. Nhưng không, BimSpeed rất trực quan. Cài xong là làm được luôn. Video hướng dẫn rất chi tiết!",
                author: "Chị Hương",
                role: "Junior MEP Engineer, Cần Thơ",
              }
            ].map((testimonial, i) => (
              <Card key={i} className="hover:shadow-xl transition-shadow duration-300">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3 sm:gap-4 mb-4">
                    <Users className="w-10 h-10 sm:w-12 sm:h-12 text-primary flex-shrink-0" />
                    <div>
                      <p className="text-xs sm:text-sm md:text-base text-foreground italic mb-4">"{testimonial.quote}"</p>
                      <div>
                        <p className="font-bold text-sm sm:text-base text-foreground">{testimonial.author}</p>
                        <p className="text-xs sm:text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-12 sm:py-16 md:py-20 px-3 sm:px-4 bg-card">
        <div className="container mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-heading mb-4">
              Cài đặt là bạn có ngay…
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {[
                "Tự động tạo hệ thống MEP trong Revit",
                "Xoay, căn chỉnh, nối branch cực nhanh",
                "Giảm lỗi kết nối – đồng bộ cao độ chính xác",
                "Hỗ trợ Revit 2020–2025",
                "Miễn phí trọn đời cho phiên bản đầu tiên"
              ].map((benefit, i) => (
                <div key={i} className="flex items-start gap-3 p-3 sm:p-4 rounded-lg bg-background border border-border hover:border-primary transition-colors">
                  <Check className="w-5 h-5 sm:w-6 sm:h-6 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-sm sm:text-base text-foreground font-medium">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-12 sm:py-16 md:py-20 px-3 sm:px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-heading mb-4 sm:mb-6">
              Đội ngũ phát triển BimSpeed MEP
            </h2>
            <div className="space-y-4 text-sm sm:text-base md:text-lg text-muted-foreground">
              <p>
                BimSpeed được phát triển bởi đội ngũ kỹ sư Revit & BIM Việt Nam với hơn 10 năm kinh nghiệm trong ngành MEP.
              </p>
              <p>
                Mục tiêu của chúng tôi là giúp kỹ sư cơ điện tiết kiệm thời gian, loại bỏ thao tác thủ công và tăng hiệu suất dự án bằng các công cụ tự động hóa trong Revit.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" className="py-12 sm:py-16 md:py-20 px-3 sm:px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-heading mb-4 sm:mb-6">
            Tiết kiệm hàng giờ thiết kế MEP mỗi ngày – hoàn toàn miễn phí!
          </h2>
          <p className="text-sm sm:text-base md:text-lg mb-6 sm:mb-8 opacity-90">
            Chỉ cần 1 phút điền thông tin, bạn sẽ nhận ngay phần mềm BimSpeed MEP – công cụ tự động hóa Revit giúp tăng tốc thiết kế, giảm lỗi và nâng cao hiệu quả.
          </p>
          
          <Button 
            variant="hero" 
            size="xl" 
            onClick={scrollToForm}
            className="mb-6 sm:mb-8 bg-card text-primary hover:bg-card/90"
          >
            <Download className="w-5 h-5" />
            NHẬN NGAY PHẦN MỀM MIỄN PHÍ
          </Button>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-12 text-left">
            {[
              { icon: <Settings className="w-6 h-6 sm:w-8 sm:h-8" />, text: "Bộ công cụ MEP Tool" },
              { icon: <Youtube className="w-6 h-6 sm:w-8 sm:h-8" />, text: "Video hướng dẫn cài đặt & sử dụng" },
              { icon: <MessageCircle className="w-6 h-6 sm:w-8 sm:h-8" />, text: "Link nhóm Zalo kỹ sư hỗ trợ kỹ thuật" }
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 bg-primary-foreground/10 rounded-lg">
                {item.icon}
                <span className="font-medium text-sm sm:text-base">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bonus Section */}
      <section id="bonus" className="py-12 sm:py-16 md:py-20 px-3 sm:px-4">
        <div className="container mx-auto max-w-4xl">
          <Card className="border-4 border-accent shadow-2xl overflow-hidden">
            <div className="bg-gradient-cta p-1">
              <div className="bg-card p-6 sm:p-8">
                <div className="text-center mb-6">
                  <h2 className="text-2xl sm:text-3xl font-bold font-heading mb-4 flex items-center justify-center gap-2">
                    <span className="text-3xl sm:text-4xl">⭐</span>
                    Tại sao chọn BimSpeed MEP?
                  </h2>
                  <p className="text-base sm:text-lg text-muted-foreground">
                    Hơn 500+ kỹ sư và công ty MEP tại Việt Nam đã tin tưởng và sử dụng BimSpeed
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
                  {[
                    { icon: "⚡", text: "Tiết kiệm 70% thời gian thiết kế MEP" },
                    { icon: "🎯", text: "Tự động hóa hoàn toàn không cần code" },
                    { icon: "🔧", text: "Hỗ trợ Revit 2020-2025" },
                    { icon: "💬", text: "Hỗ trợ kỹ thuật 24/7 qua nhóm Zalo" }
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3 p-4 bg-secondary rounded-lg border border-border hover:border-accent transition-colors">
                      <span className="text-2xl flex-shrink-0">{item.icon}</span>
                      <span className="text-sm sm:text-base font-medium text-foreground">{item.text}</span>
                    </div>
                  ))}
                </div>

                <div className="text-center">
                  <Button variant="cta" size="xl" onClick={scrollToForm}>
                    <Download className="w-5 h-5" />
                    NHẬN NGAY - HOÀN TOÀN MIỄN PHÍ
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Privacy Section */}
      <section id="privacy" className="py-8 sm:py-12 px-3 sm:px-4 bg-secondary">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-start gap-3 sm:gap-4 p-4 sm:p-6 bg-card rounded-lg border border-border">
            <Lock className="w-6 h-6 sm:w-8 sm:h-8 text-primary flex-shrink-0" />
            <div>
              <h3 className="font-bold text-base sm:text-lg mb-2 flex items-center gap-2">
                🔒 Chúng tôi tôn trọng quyền riêng tư
              </h3>
              <p className="text-xs sm:text-sm md:text-base text-muted-foreground">
                Email và số điện thoại của bạn chỉ được dùng để gửi link tải và hướng dẫn cài đặt – không spam, không chia sẻ cho bên thứ ba.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-8 sm:py-12 px-3 sm:px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
            {/* Logo & Company */}
            <div>
              <BimSpeedLogo size="md" className="mb-4" />
              <p className="text-xs sm:text-sm opacity-80">
                © 2025 BimSpeed Solutions
              </p>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-bold mb-4 text-sm sm:text-base">Liên hệ</h4>
              <div className="space-y-2 text-xs sm:text-sm">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  <span>Ms Hiên – 0936 340 576</span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 flex-shrink-0" />
                  <a href="https://zalo.me/g/gttlef153" target="_blank" rel="noopener noreferrer" className="hover:underline">
                    Nhóm Zalo kỹ sư
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 flex-shrink-0" />
                  <a href="https://www.bimspeed.net/download" target="_blank" rel="noopener noreferrer" className="hover:underline">
                    www.bimspeed.net/download
                  </a>
                </div>
              </div>
            </div>

            {/* Social */}
            <div>
              <h4 className="font-bold mb-4 text-sm sm:text-base">Theo dõi chúng tôi</h4>
              <div className="flex gap-4">
                <a href="#" className="hover:opacity-80 transition-opacity">
                  <Facebook className="w-6 h-6" />
                </a>
                <a href="#" className="hover:opacity-80 transition-opacity">
                  <Youtube className="w-6 h-6" />
                </a>
                <a href="https://zalo.me/g/gttlef153" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                  <MessageCircle className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-background/20 pt-6 sm:pt-8 text-center text-xs sm:text-sm opacity-80">
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
              <a href="#" className="hover:underline">Privacy Policy</a>
              <a href="#" className="hover:underline">Terms of Service</a>
              <a href="#" className="hover:underline">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
