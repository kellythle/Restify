from django.urls import path
from .views import AddProperty, EditProperty, DeleteProperty, OrderSortProperties, EditPropertyImages, GetUserNotifications, \
    CreateReservation, EditReservation, DeleteReservation, HostReservation, GuestReservation, DeleteUserNotification, \
    CreateNotification, UpdateNotificationRead, ReadProperty

app_name = 'properties'
urlpatterns = [
    path('addproperty/', AddProperty.as_view(), name='createproperty'),
    path('editproperty/<int:pk>/', EditProperty.as_view(), name='editproperty'),
    path('editingproperty/<int:pk>/',
         EditProperty.as_view(), name='editingproperty'),
    path('editingpropertyimages/<int:pk>/',
         EditPropertyImages.as_view(), name='editingpropertyimg'),
    path('deleteproperty/<int:pk>/',
         DeleteProperty.as_view(), name='deleteproperty'),
    path('getproperty/<int:pk>/', ReadProperty.as_view(), name='getproperty'),
    path('all/', OrderSortProperties.as_view(), name='ordersort'),

    path('createreservation/', CreateReservation.as_view(),
         name='createreservation'),
    path('deletereservation/<int:pk>/',
         DeleteReservation.as_view(), name='deletereservation'),
    path('guestreservation/',
         EditReservation.as_view(), name='editreservation'),
    path('hostreservation/',
         HostReservation.as_view(), name='hostreservation'),
    path('editreservation/<int:pk>',
         GuestReservation.as_view(), name='guestreservation'),
    path('usernotifcations/<int:pk>/',
         GetUserNotifications.as_view(), name='usernotis'),
    path('usernotifications/<int:pk>/delete/<int:num>/',
         DeleteUserNotification.as_view(), name='deletenoti'),
    path('usernotifications/<int:pk>/update_read/<int:num>/',
         UpdateNotificationRead.as_view(), name='updatereadnoti'),
    path('usernotifications/<int:pk>/create/',
         CreateNotification.as_view(), name='createnoti'),

]
