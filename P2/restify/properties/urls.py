from django.urls import path
from views import AddProperty, EditProperty, DeleteProperty, OrderSortProperties, EditPropertyImages

app_name = 'properties'
url_patterns = [
    #path('login/', views.LoginView.as_view(), name='login'),
    path('addproperty/', AddProperty.as_view(), name='createproperty'),
    path('editproperty/<int:pk>', EditProperty.as_view(), name='editproperty'),
    path('editimgproperty/<int:pk>',
         EditPropertyImages.as_view(), name='editimgproperty'),
    path('deleteproperty/<int:pk>',
         DeleteProperty.as_view(), name='deleteproperty'),
    path('/', OrderSortProperties.as_view(), name='ordersort')
]
