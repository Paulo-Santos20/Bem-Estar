import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Layout } from '../../components/common/Layout';
import { ProductGallery } from '../../components/features/ProductGallery';
import { ProductInfo } from '../../components/features/ProductInfo';
import { ProductTabs } from '../../components/features/ProductTabs';
import { RelatedProducts } from '../../components/features/RelatedProducts';
import { ProductReviews } from '../../components/features/ProductReviews';
import { Breadcrumb } from '../../components/ui/Breadcrumb'; // Import correto
import { Loading } from '../../components/common/Loading';
import { products } from '../../data/products';
import './Product.css';

export const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  useEffect(() => {
    // Simular carregamento da API
    const loadProduct = async () => {
      setLoading(true);
      try {
        // Simular delay da API
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const foundProduct = products.find(p => p.id === parseInt(id));
        
        if (!foundProduct) {
          navigate('/404');
          return;
        }
        
        setProduct(foundProduct);
        setSelectedVariant(foundProduct.variants?.[0] || null);
      } catch (error) {
        console.error('Erro ao carregar produto:', error);
        navigate('/404');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadProduct();
    }
  }, [id, navigate]);

  const handleAddToCart = () => {
    const cartItem = {
      id: product.id,
      name: product.name,
      price: selectedVariant?.price || product.price,
      image: product.images[0],
      quantity,
      variant: selectedVariant
    };

    // Adicionar ao carrinho (implementar lógica do contexto)
    console.log('Adicionando ao carrinho:', cartItem);
    
    // Mostrar feedback visual
    const button = document.querySelector('.product-info__add-to-cart');
    const originalText = button.textContent;
    button.textContent = 'Adicionado!';
    button.style.background = '#28a745';
    
    setTimeout(() => {
      button.textContent = originalText;
      button.style.background = '';
    }, 2000);
  };

  const breadcrumbItems = [
    { label: 'Início', href: '/' },
    { label: 'Produtos', href: '/produtos' },
    { label: product?.category || 'Categoria', href: `/categoria/${product?.categorySlug}` },
    { label: product?.name || 'Produto', href: '#', active: true }
  ];

  if (loading) {
    return (
      <Layout>
        <div className="product-page">
          <div className="container">
            <Loading />
          </div>
        </div>
      </Layout>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <Layout>
      <div className="product-page">
        <div className="container">
          {/* Breadcrumb */}
          <Breadcrumb items={breadcrumbItems} />

          {/* Produto Principal */}
          <div className="product-main">
            <div className="product-main__gallery">
              <ProductGallery 
                images={product.images}
                productName={product.name}
              />
            </div>
            
            <div className="product-main__info">
              <ProductInfo
                product={product}
                selectedVariant={selectedVariant}
                onVariantChange={setSelectedVariant}
                quantity={quantity}
                onQuantityChange={setQuantity}
                onAddToCart={handleAddToCart}
              />
            </div>
          </div>

          {/* Abas do Produto */}
          <ProductTabs
            product={product}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />

          {/* Avaliações */}
          <ProductReviews productId={product.id} />

          {/* Produtos Relacionados */}
          <RelatedProducts 
            currentProductId={product.id}
            category={product.category}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Product;