import React, { useState, useEffect } from 'react';
import './ProductReviews.css';

export const ProductReviews = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [sortBy, setSortBy] = useState('newest');
  const [filterBy, setFilterBy] = useState('all');
  const [newReview, setNewReview] = useState({
    rating: 0,
    title: '',
    comment: '',
    name: '',
    email: '',
    wouldRecommend: true
  });

  // Dados mockados de reviews
  const mockReviews = [
    {
      id: 1,
      productId: 1,
      name: 'Maria Silva',
      rating: 5,
      title: 'Excelente produto!',
      comment: 'Estou usando há 3 meses e os resultados são visíveis. Recomendo muito!',
      date: '2024-01-15',
      verified: true,
      helpful: 12,
      wouldRecommend: true,
      avatar: '👩‍💼'
    },
    {
      id: 2,
      productId: 1,
      name: 'João Santos',
      rating: 4,
      title: 'Bom custo-benefício',
      comment: 'Produto de qualidade, entrega rápida. Apenas o preço poderia ser um pouco melhor.',
      date: '2024-01-10',
      verified: true,
      helpful: 8,
      wouldRecommend: true,
      avatar: '👨‍💻'
    },
    {
      id: 3,
      productId: 1,
      name: 'Ana Costa',
      rating: 5,
      title: 'Superou expectativas',
      comment: 'Produto chegou antes do prazo e exatamente como descrito. Muito satisfeita com a compra.',
      date: '2024-01-08',
      verified: false,
      helpful: 15,
      wouldRecommend: true,
      avatar: '👩‍🎓'
    },
    {
      id: 4,
      productId: 1,
      name: 'Carlos Oliveira',
      rating: 3,
      title: 'Produto OK',
      comment: 'Atende o que promete, mas nada excepcional. Esperava um pouco mais pela marca.',
      date: '2024-01-05',
      verified: true,
      helpful: 3,
      wouldRecommend: false,
      avatar: '👨‍🔬'
    },
    {
      id: 5,
      productId: 1,
      name: 'Fernanda Lima',
      rating: 5,
      title: 'Recomendo demais!',
      comment: 'Já é a segunda vez que compro. Produto de excelente qualidade e atendimento nota 10.',
      date: '2024-01-02',
      verified: true,
      helpful: 20,
      wouldRecommend: true,
      avatar: '👩‍⚕️'
    }
  ];

  useEffect(() => {
    // Simular carregamento de reviews
    const loadReviews = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const productReviews = mockReviews.filter(review => review.productId === productId);
      setReviews(productReviews);
      setLoading(false);
    };

    loadReviews();
  }, [productId]);

  const handleSubmitReview = (e) => {
    e.preventDefault();
    
    if (newReview.rating === 0) {
      alert('Por favor, selecione uma avaliação');
      return;
    }

    const review = {
      id: Date.now(),
      productId,
      name: newReview.name,
      rating: newReview.rating,
      title: newReview.title,
      comment: newReview.comment,
      date: new Date().toISOString().split('T')[0],
      verified: false,
      helpful: 0,
      wouldRecommend: newReview.wouldRecommend,
      avatar: '👤'
    };

    setReviews([review, ...reviews]);
    setNewReview({
      rating: 0,
      title: '',
      comment: '',
      name: '',
      email: '',
      wouldRecommend: true
    });
    setShowReviewForm(false);

    // Mostrar mensagem de sucesso
    alert('Avaliação enviada com sucesso! Obrigado pelo seu feedback.');
  };

  const handleRatingClick = (rating) => {
    setNewReview({ ...newReview, rating });
  };

  const handleHelpful = (reviewId) => {
    setReviews(reviews.map(review => 
      review.id === reviewId 
        ? { ...review, helpful: review.helpful + 1 }
        : review
    ));
  };

  const getFilteredAndSortedReviews = () => {
    let filtered = reviews;

    // Filtrar por rating
    if (filterBy !== 'all') {
      const rating = parseInt(filterBy);
      filtered = reviews.filter(review => review.rating === rating);
    }

    // Ordenar
    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case 'highest':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'lowest':
        filtered.sort((a, b) => a.rating - b.rating);
        break;
      case 'helpful':
        filtered.sort((a, b) => b.helpful - a.helpful);
        break;
      default:
        break;
    }

    return filtered;
  };

  const getAverageRating = () => {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (sum / reviews.length).toFixed(1);
  };

  const getRatingDistribution = () => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach(review => {
      distribution[review.rating]++;
    });
    return distribution;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const filteredReviews = getFilteredAndSortedReviews();
  const averageRating = getAverageRating();
  const ratingDistribution = getRatingDistribution();
  const totalReviews = reviews.length;

  if (loading) {
    return (
      <section className="product-reviews">
        <div className="product-reviews__loading">
          <div className="product-reviews__loading-spinner"></div>
          <p>Carregando avaliações...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="product-reviews">
      {/* Cabeçalho */}
      <div className="product-reviews__header">
        <h2 className="product-reviews__title">
          <span className="product-reviews__title-icon">⭐</span>
          Avaliações dos Clientes
        </h2>
        <p className="product-reviews__subtitle">
          Veja o que nossos clientes estão dizendo sobre este produto
        </p>
      </div>

      {/* Resumo das Avaliações */}
      <div className="product-reviews__summary">
        <div className="product-reviews__summary-main">
          <div className="product-reviews__average">
            <span className="product-reviews__average-number">{averageRating}</span>
            <div className="product-reviews__average-stars">
              {[...Array(5)].map((_, index) => (
                <span
                  key={index}
                  className={`product-reviews__star ${
                    index < Math.floor(averageRating) ? 'product-reviews__star--filled' : ''
                  }`}
                >
                  ★
                </span>
              ))}
            </div>
            <span className="product-reviews__total">
              Baseado em {totalReviews} avaliações
            </span>
          </div>

          <div className="product-reviews__distribution">
            {[5, 4, 3, 2, 1].map(rating => (
              <div key={rating} className="product-reviews__distribution-item">
                <span className="product-reviews__distribution-label">
                  {rating} ★
                </span>
                <div className="product-reviews__distribution-bar">
                  <div 
                    className="product-reviews__distribution-fill"
                    style={{ 
                      width: totalReviews > 0 ? `${(ratingDistribution[rating] / totalReviews) * 100}%` : '0%' 
                    }}
                  ></div>
                </div>
                <span className="product-reviews__distribution-count">
                  {ratingDistribution[rating]}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="product-reviews__summary-actions">
          <button
            className="product-reviews__write-button"
            onClick={() => setShowReviewForm(!showReviewForm)}
          >
            <span className="icon">✍️</span>
            Escrever Avaliação
          </button>
        </div>
      </div>

      {/* Formulário de Nova Avaliação */}
      {showReviewForm && (
        <div className="product-reviews__form-container">
          <form className="product-reviews__form" onSubmit={handleSubmitReview}>
            <h3 className="product-reviews__form-title">Escreva sua Avaliação</h3>
            
            {/* Rating */}
            <div className="product-reviews__form-group">
              <label className="product-reviews__form-label">
                Sua Avaliação *
              </label>
              <div className="product-reviews__form-rating">
                {[1, 2, 3, 4, 5].map(rating => (
                  <button
                    key={rating}
                    type="button"
                    className={`product-reviews__form-star ${
                      rating <= newReview.rating ? 'product-reviews__form-star--active' : ''
                    }`}
                    onClick={() => handleRatingClick(rating)}
                  >
                    ★
                  </button>
                ))}
                <span className="product-reviews__form-rating-text">
                  {newReview.rating > 0 && (
                    newReview.rating === 1 ? 'Muito Ruim' :
                    newReview.rating === 2 ? 'Ruim' :
                    newReview.rating === 3 ? 'Regular' :
                    newReview.rating === 4 ? 'Bom' : 'Excelente'
                  )}
                </span>
              </div>
            </div>

            {/* Título */}
            <div className="product-reviews__form-group">
              <label className="product-reviews__form-label">
                Título da Avaliação *
              </label>
              <input
                type="text"
                className="product-reviews__form-input"
                value={newReview.title}
                onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
                placeholder="Resuma sua experiência"
                required
              />
            </div>

            {/* Comentário */}
            <div className="product-reviews__form-group">
              <label className="product-reviews__form-label">
                Seu Comentário *
              </label>
              <textarea
                className="product-reviews__form-textarea"
                value={newReview.comment}
                onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                placeholder="Conte-nos sobre sua experiência com este produto..."
                rows="4"
                required
              ></textarea>
            </div>

            {/* Nome */}
            <div className="product-reviews__form-group">
              <label className="product-reviews__form-label">
                Seu Nome *
              </label>
              <input
                type="text"
                className="product-reviews__form-input"
                value={newReview.name}
                onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                placeholder="Como você gostaria de aparecer"
                required
              />
            </div>

            {/* Email */}
            <div className="product-reviews__form-group">
              <label className="product-reviews__form-label">
                Seu Email *
              </label>
              <input
                type="email"
                className="product-reviews__form-input"
                value={newReview.email}
                onChange={(e) => setNewReview({ ...newReview, email: e.target.value })}
                placeholder="Não será exibido publicamente"
                required
              />
            </div>

            {/* Recomendação */}
            <div className="product-reviews__form-group">
              <label className="product-reviews__form-checkbox">
                <input
                  type="checkbox"
                  checked={newReview.wouldRecommend}
                  onChange={(e) => setNewReview({ ...newReview, wouldRecommend: e.target.checked })}
                />
                <span className="product-reviews__form-checkbox-mark"></span>
                Eu recomendaria este produto
              </label>
            </div>

            {/* Botões */}
            <div className="product-reviews__form-actions">
              <button
                type="button"
                className="product-reviews__form-cancel"
                onClick={() => setShowReviewForm(false)}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="product-reviews__form-submit"
              >
                Enviar Avaliação
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Filtros e Ordenação */}
      {reviews.length > 0 && (
        <div className="product-reviews__controls">
          <div className="product-reviews__filters">
            <label className="product-reviews__filter-label">Filtrar por:</label>
            <select
              className="product-reviews__filter-select"
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value)}
            >
              <option value="all">Todas as avaliações</option>
              <option value="5">5 estrelas</option>
              <option value="4">4 estrelas</option>
              <option value="3">3 estrelas</option>
              <option value="2">2 estrelas</option>
              <option value="1">1 estrela</option>
            </select>
          </div>

          <div className="product-reviews__sort">
            <label className="product-reviews__sort-label">Ordenar por:</label>
            <select
              className="product-reviews__sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="newest">Mais recentes</option>
              <option value="oldest">Mais antigas</option>
              <option value="highest">Maior avaliação</option>
              <option value="lowest">Menor avaliação</option>
              <option value="helpful">Mais úteis</option>
            </select>
          </div>
        </div>
      )}

      {/* Lista de Avaliações */}
      <div className="product-reviews__list">
        {filteredReviews.length > 0 ? (
          filteredReviews.map((review) => (
            <div key={review.id} className="product-reviews__item">
              <div className="product-reviews__item-header">
                <div className="product-reviews__item-user">
                  <div className="product-reviews__item-avatar">
                    {review.avatar}
                  </div>
                  <div className="product-reviews__item-user-info">
                    <span className="product-reviews__item-name">
                      {review.name}
                      {review.verified && (
                        <span className="product-reviews__verified" title="Compra verificada">
                          ✓
                        </span>
                      )}
                    </span>
                    <span className="product-reviews__item-date">
                      {formatDate(review.date)}
                    </span>
                  </div>
                </div>

                <div className="product-reviews__item-rating">
                  {[...Array(5)].map((_, index) => (
                    <span
                      key={index}
                      className={`product-reviews__star ${
                        index < review.rating ? 'product-reviews__star--filled' : ''
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>

              <div className="product-reviews__item-content">
                <h4 className="product-reviews__item-title">{review.title}</h4>
                <p className="product-reviews__item-comment">{review.comment}</p>
                
                {review.wouldRecommend && (
                  <div className="product-reviews__item-recommend">
                    <span className="icon">👍</span>
                    Recomenda este produto
                  </div>
                )}
              </div>

              <div className="product-reviews__item-footer">
                <button
                  className="product-reviews__helpful-button"
                  onClick={() => handleHelpful(review.id)}
                >
                  <span className="icon">👍</span>
                  Útil ({review.helpful})
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="product-reviews__empty">
            <span className="product-reviews__empty-icon">📝</span>
            <h3>Nenhuma avaliação encontrada</h3>
            <p>
              {filterBy !== 'all' 
                ? 'Tente alterar os filtros para ver mais avaliações.'
                : 'Seja o primeiro a avaliar este produto!'
              }
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductReviews;