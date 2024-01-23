// course.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private apiUrl = 'http://localhost:8000/courses'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  getCourses(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  searchAndSortCourses(query: string): Observable<any[]> {
    if (!query.trim()) {
      // If query is empty or contains only whitespace, return an empty array
      return of([]);
    }

    return this.getCourses().pipe(
      map(courses => this.filterAndSortCourses(courses, query))
    );
  }

  private filterAndSortCourses(courses: any[], query: string): any[] {
    query = query.toLowerCase();

    return courses.filter(course =>
      course.courseName.toLowerCase().includes(query) ||
      course.author.toLowerCase().includes(query) ||
      course.tags.some((tag: string) => tag.toLowerCase().includes(query))
    );
  }

}
