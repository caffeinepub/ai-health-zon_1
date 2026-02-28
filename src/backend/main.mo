import Map "mo:core/Map";
import Iter "mo:core/Iter";
import Array "mo:core/Array";
import Text "mo:core/Text";
import Float "mo:core/Float";
import Time "mo:core/Time";
import Order "mo:core/Order";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";

import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // User Profile Type
  public type UserProfile = {
    name : Text;
    email : Text;
    organization : ?Text;
  };

  // Data Types
  public type DemoBooking = {
    id : Nat;
    name : Text;
    organization : Text;
    mobile : Text;
    email : Text;
    city : Text;
    message : Text;
    preferredDate : Time.Time;
    createdAt : Time.Time;
  };

  public type NetworkJoinRequest = {
    id : Nat;
    name : Text;
    organizationType : Text;
    organizationName : Text;
    contactDetails : Text;
    message : Text;
    submittedAt : Time.Time;
    status : Text;
  };

  public type InsightContent = {
    id : Nat;
    title : Text;
    category : Text;
    summary : Text;
    content : Text;
    author : Text;
    publicationDate : Time.Time;
  };

  public type ContactInquiry = {
    id : Nat;
    name : Text;
    email : Text;
    phone : Text;
    message : Text;
    submittedAt : Time.Time;
  };

  public type PageAnalytics = {
    pageSection : Text;
    viewCount : Nat;
    engagementScore : Float;
  };

  // Storage
  var demoBookingIdCounter = 0;
  var networkRequestIdCounter = 0;
  var insightContentIdCounter = 0;
  var contactInquiryIdCounter = 0;

  let userProfiles = Map.empty<Principal, UserProfile>();
  let demoBookings = Map.empty<Nat, DemoBooking>();
  let networkJoinRequests = Map.empty<Nat, NetworkJoinRequest>();
  let insightContents = Map.empty<Nat, InsightContent>();
  let contactInquiries = Map.empty<Nat, ContactInquiry>();
  let pageAnalytics = Map.empty<Text, PageAnalytics>();

  // User Profile Management
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Demo Booking - Public access (any user including guests)
  public shared ({ caller }) func submitDemoBooking(name : Text, org : Text, mobile : Text, email : Text, city : Text, msg : Text, prefDate : Time.Time) : async () {
    let booking : DemoBooking = {
      id = demoBookingIdCounter;
      name;
      organization = org;
      mobile;
      email;
      city;
      message = msg;
      preferredDate = prefDate;
      createdAt = Time.now();
    };
    demoBookings.add(demoBookingIdCounter, booking);
    demoBookingIdCounter += 1;
  };

  public query ({ caller }) func getAllDemoBookings() : async [DemoBooking] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view demo bookings");
    };
    demoBookings.values().toArray();
  };

  // Network Join Request - Public access (any user including guests)
  public shared ({ caller }) func submitNetworkJoinRequest(name : Text, orgType : Text, orgName : Text, contact : Text, msg : Text) : async () {
    let request : NetworkJoinRequest = {
      id = networkRequestIdCounter;
      name;
      organizationType = orgType;
      organizationName = orgName;
      contactDetails = contact;
      message = msg;
      submittedAt = Time.now();
      status = "pending";
    };
    networkJoinRequests.add(networkRequestIdCounter, request);
    networkRequestIdCounter += 1;
  };

  public query ({ caller }) func getAllNetworkRequests() : async [NetworkJoinRequest] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view network requests");
    };
    networkJoinRequests.values().toArray();
  };

  // Insight Content - Admin write, public read
  public shared ({ caller }) func addInsightContent(title : Text, category : Text, summary : Text, content : Text, author : Text, pubDate : Time.Time) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can add insight content");
    };
    let insight : InsightContent = {
      id = insightContentIdCounter;
      title;
      category;
      summary;
      content;
      author;
      publicationDate = pubDate;
    };
    insightContents.add(insightContentIdCounter, insight);
    insightContentIdCounter += 1;
  };

  public query ({ caller }) func getAllInsights() : async [InsightContent] {
    let insights = insightContents.values().toArray();
    insights.sort(
      func(a : InsightContent, b : InsightContent) : Order.Order {
        switch (Text.compare(a.category, b.category)) {
          case (#equal) { Text.compare(a.title, b.title) };
          case (order) { order };
        };
      },
    );
  };

  public query ({ caller }) func getInsightsByCategory(category : Text) : async [InsightContent] {
    insightContents.values().toArray().filter<InsightContent>(
      func(content : InsightContent) : Bool { content.category == category },
    );
  };

  // Contact Inquiry - Public access (any user including guests)
  public shared ({ caller }) func submitContactInquiry(name : Text, email : Text, phone : Text, message : Text) : async () {
    let inquiry : ContactInquiry = {
      id = contactInquiryIdCounter;
      name;
      email;
      phone;
      message;
      submittedAt = Time.now();
    };
    contactInquiries.add(contactInquiryIdCounter, inquiry);
    contactInquiryIdCounter += 1;
  };

  public query ({ caller }) func getAllContactInquiries() : async [ContactInquiry] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view contact inquiries");
    };
    contactInquiries.values().toArray();
  };

  // Analytics - Public write (for tracking), admin read
  public shared ({ caller }) func recordPageView(section : Text) : async () {
    switch (pageAnalytics.get(section)) {
      case (null) {
        pageAnalytics.add(
          section,
          {
            pageSection = section;
            viewCount = 1;
            engagementScore = 0.0;
          },
        );
      };
      case (?analytics) {
        pageAnalytics.add(
          section,
          {
            analytics with
            viewCount = analytics.viewCount + 1;
          },
        );
      };
    };
  };

  public query ({ caller }) func getAllPageAnalytics() : async [PageAnalytics] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view analytics");
    };
    pageAnalytics.values().toArray();
  };
};
