import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Time = bigint;
export interface PageAnalytics {
    viewCount: bigint;
    engagementScore: number;
    pageSection: string;
}
export interface InsightContent {
    id: bigint;
    title: string;
    content: string;
    author: string;
    summary: string;
    publicationDate: Time;
    category: string;
}
export interface NetworkJoinRequest {
    id: bigint;
    status: string;
    organizationName: string;
    organizationType: string;
    name: string;
    submittedAt: Time;
    message: string;
    contactDetails: string;
}
export interface ContactInquiry {
    id: bigint;
    name: string;
    submittedAt: Time;
    email: string;
    message: string;
    phone: string;
}
export interface UserProfile {
    name: string;
    email: string;
    organization?: string;
}
export interface DemoBooking {
    id: bigint;
    city: string;
    name: string;
    createdAt: Time;
    email: string;
    message: string;
    preferredDate: Time;
    mobile: string;
    organization: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addInsightContent(title: string, category: string, summary: string, content: string, author: string, pubDate: Time): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getAllContactInquiries(): Promise<Array<ContactInquiry>>;
    getAllDemoBookings(): Promise<Array<DemoBooking>>;
    getAllInsights(): Promise<Array<InsightContent>>;
    getAllNetworkRequests(): Promise<Array<NetworkJoinRequest>>;
    getAllPageAnalytics(): Promise<Array<PageAnalytics>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getInsightsByCategory(category: string): Promise<Array<InsightContent>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    recordPageView(section: string): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    submitContactInquiry(name: string, email: string, phone: string, message: string): Promise<void>;
    submitDemoBooking(name: string, org: string, mobile: string, email: string, city: string, msg: string, prefDate: Time): Promise<void>;
    submitNetworkJoinRequest(name: string, orgType: string, orgName: string, contact: string, msg: string): Promise<void>;
}
