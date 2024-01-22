import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pricing.component.html',
  styleUrl: './pricing.component.css',
})
export class PricingComponent implements OnInit {
  currentRoute: string | undefined;
  expression: number | boolean = true;

  faq: { question: string; answer: string }[] = [
    {
      question: 'Can I enroll in multiple courses at once?',
      answer:
        'Absolutely! You can enroll in multiple courses simultaneously and access them at your convenience.',
    },
    {
      question: 'Can I enroll in multiple courses at once?',
      answer:
        'Absolutely! You can enroll in multiple courses simultaneously and access them at your convenience.',
    },
    {
      question: 'Can I enroll in multiple courses at once?',
      answer:
        'Absolutely! You can enroll in multiple courses simultaneously and access them at your convenience.',
    },
    {
      question: 'Can I enroll in multiple courses at once?',
      answer:
        'Absolutely! You can enroll in multiple courses simultaneously and access them at your convenience.',
    },
    {
      question: 'Can I enroll in multiple courses at once?',
      answer:
        'Absolutely! You can enroll in multiple courses simultaneously and access them at your convenience.',
    },
  ];


  svgChange: boolean[] = new Array(this.faq.length).fill(true);

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.url.subscribe((segments) => {
      // Extract the current route
      this.currentRoute = segments.join('/pricing');
      console.log(this.currentRoute);
    });

  }

  activeTab: 'monthly' | 'yearly' = 'monthly';

  setActiveTab(tab: 'monthly' | 'yearly'): string {
    return (this.activeTab = tab);
  }

  faqHandler(index: any) {
    if (this.expression === index) {
      this.expression = false;
    } else {
      this.expression = index;
    }
    this.svgChange[index] = !this.svgChange[index];
  }
}
