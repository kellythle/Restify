from django.urls import path
from .views import AddProperty, EditProperty, DeleteProperty, EditPropertyImages, GetUserNotifications, \
    CreateReservation, EditReservation, DeleteReservation, HostReservation, GuestReservation, DeleteUserNotification, \
    CreateNotification, UpdateNotificationRead, ReadProperty, CreatePropertyComment, CreatePropertyResponseComment, \
    GetPropertyCommentThreads, GetUserCommentThreads, CreateUserComment, IsOwner

from .views.searchproperties import SearchProperties

app_name = 'properties'
urlpatterns = [
    path('addproperty/', AddProperty.as_view(), name='createproperty'),
    path('editproperty/<int:pk>/', EditProperty.as_view(), name='editproperty'),
    path('editingpropertyimages/<int:pk>/',
         EditPropertyImages.as_view(), name='editingpropertyimg'),
    path('deleteproperty/<int:pk>/',
         DeleteProperty.as_view(), name='deleteproperty'),
    path('getproperty/<int:pk>/', ReadProperty.as_view(), name='getproperty'),
    path('search/', SearchProperties.as_view(), name='searchproperties'),
    path('createreservation/', CreateReservation.as_view(),
         name='createreservation'),
    path('deletereservation/<int:pk>/',
         DeleteReservation.as_view(), name='deletereservation'),
    path('guestreservation/',
         GuestReservation.as_view(), name='guestreservation'),
    path('hostreservation/',
         HostReservation.as_view(), name='hostreservation'),
    path('editreservation/<int:pk>/',
         EditReservation.as_view(), name='editreservation'),
    path('usernotifications/',
         GetUserNotifications.as_view(), name='usernotis'),
    path('usernotifications/delete/<int:pk>/',
         DeleteUserNotification.as_view(), name='deletenoti'),
    path('usernotifications/update_read/<int:pk>/',
         UpdateNotificationRead.as_view(), name='updatereadnoti'),
    path('usernotifications/create/<int:pk>/',
         CreateNotification.as_view(), name='createnoti'),
    path('createcomment/<int:pk>/',
         CreatePropertyComment.as_view(), name='createcomm'),
    path('createresponse/<int:pk>/',
         CreatePropertyResponseComment.as_view(), name='createcomm'),
    path('propertycomments/<int:pk>/', GetPropertyCommentThreads.as_view(),
         name='propertycomms'),
    path('usercomments/<int:pk>/',
         GetUserCommentThreads.as_view(), name='usercomms'),
    path('createusercomment/<int:pk>/',
         CreateUserComment.as_view(), name='newusercomment'),
    path('IsOwner/<int:pk>/', IsOwner.as_view(), name='isowner')

]
