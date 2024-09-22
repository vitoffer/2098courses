"""url field course

Revision ID: cce98df03217
Revises: 1b479149e24e
Create Date: 2024-09-22 16:12:07.908839

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'cce98df03217'
down_revision: Union[str, None] = '1b479149e24e'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column('course', sa.Column('url', sa.String(), nullable=True))


def downgrade() -> None:
    pass
